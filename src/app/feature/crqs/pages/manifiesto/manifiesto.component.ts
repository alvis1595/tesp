import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { GetChangesService } from '../../../../core/services/get-changes.service';
import { Content, ManifestRequest, RepoFlat, Technology } from '../../../../core/interfaces/manifest';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-manifiesto',
  imports: [NzInputModule, FormsModule, CommonModule, NzIconModule, CdkDropList, CdkDrag,NzButtonModule, NzModalModule],
  templateUrl: './manifiesto.component.html',
  styleUrl: './manifiesto.component.scss'
})
export class ManifiestoComponent {
  rep: string = '';
  manifest: Content | any;
  loading: boolean = true;
  isSaveDisabled: boolean = true;
  error: boolean = false;
  content: boolean = false;
  mesa:string = ''
  technologies: any;
  repositories: any;

  // Lista de servicios en su orden predeterminado
  AWS_SERVICES = [
    "errors",
    "layer",
    "lambda",
    "apigateway",
    "parameters",
    "secret",
    "s3",
    "infra",
    "lib-java",
    "lib-js",
    "lib-poetry",
    "lib-robot",
    "cloudfront",
    "dynamodb",
    "email",
    "sqs",
    "mock",
    "service",
    "waf",
    "web",
    "apiconnect",
    "cloudwatch"
  ]

  constructor(
    private getChangeServices: GetChangesService,
    private message: NzMessageService,
    private modal: NzModalService
  ) { 
  }

  chargeData() {
    const request: ManifestRequest = {
      REP: this.rep,
      ENV: 'on-cloud'
    }

    this.error = false;
    this.isSaveDisabled = true;
    this.content = false;

    this.getChangeServices.getManifest(request).subscribe({
      next: (response) => {
        this.loading = false;
        this.manifest = response;
        console.log(this.manifest);

        this.getTecnologies()
      },
      error: (error) => {
        console.error("error", error);
        this.error = true;
      }
    })
  }

  getTecnologies() {
    this.manifest = this.manifest.manifest;
    this.technologies = Object.keys(this.manifest).filter((key) => Array.isArray(this.manifest[key]));
    this.technologies = this.technologies.filter((tecnologies: any) => tecnologies != 'last_modified')

    const status = this.manifest.status;
    this.content = true;
    this.mesa = this.manifest.team;
    if (status == "error") {
      this.manifest = "No fue posible obtener el manifiesto, Por favor verifique si ha seleccionado el entorno correcto."
    } else {
      if (this.manifest.status == "error") {
        console.log('no se encontro un manifiesto asociado con dicho REP', this.rep);
      } else {
        // Validar que el manifiesto tenga elementos
        if (this.technologies.length === 0) {
          console.log("El manifiesto no tiene elementos que liberar.");
          this.error = true;
        } else {
          console.log("Technologies:", this.technologies);
          this.buildRepoFlatList()
          this.sortRepositories();
        } 
      }
    }
  }

  /**
   * ===========================================================================
   * Métodos para manipular los datos del manifiesto
   * ===========================================================================
   */

  // Construye la lista plana de repositorios a partir del manifiesto
  buildRepoFlatList(){
    this.repositories = Object.entries(this.manifest)
      .filter(([key, value]) => Array.isArray(value) && key !== 'last_modified')
      .flatMap(([key, value]) =>
        (value as Technology[]).map((tech: Technology): RepoFlat => ({
          tech: tech.type ?? key,
          repository: tech.repository,
          "application-name": tech["application-name"],
          artifact: Number(tech.artifact),
          parallelism: tech.parallelism ?? false,
          deployOrder: tech.deployOrder ?? undefined,
          skipRegions: tech.skipRegions ?? []
        }))
      );

    console.log("Repositories: ", this.repositories);
  }

  // Ordena los repositorios
  sortRepositories(){
    if (this.manifest.customOrder) {
      // Particionar en "con order válido" y "sin order válido"
      const withOrder    = this.repositories.filter((r: { deployOrder: null; }) => r.deployOrder != null);
      const withoutOrder = this.repositories.filter((r: { deployOrder: null; }) => r.deployOrder == null);

      // Ordenar por el campo 'deployOrder' si customOrder está activo
      withOrder.sort((a: { deployOrder: number; }, b: { deployOrder: number; }) => a.deployOrder - b.deployOrder);

      // Ordenar los sin order al final según AWS_SERVICES
      withoutOrder.sort((a: { tech: string; }, b: { tech: string; }) => {
        const indexA = this.AWS_SERVICES.indexOf(a.tech.toLowerCase());
        const indexB = this.AWS_SERVICES.indexOf(b.tech.toLowerCase());

      // Asignar un índice seguro para tecnologías no listadas
        const safeIndexA = indexA === -1 ? Number.MAX_SAFE_INTEGER : indexA;
        const safeIndexB = indexB === -1 ? Number.MAX_SAFE_INTEGER : indexB;

        return safeIndexA - safeIndexB;
      });

      console.log("Repositories sorted by deployOrder and AWS_SERVICES: ", [...withOrder, ...withoutOrder]);
      // Combinar ambas listas
      this.repositories = [...withOrder, ...withoutOrder];
    } else {
      // Ordenar según el orden de AWS_SERVICES
      this.repositories.sort((a: { tech: string; }, b: { tech: string; }) => {
        const indexA = this.AWS_SERVICES.indexOf(a.tech.toLowerCase());
        const indexB = this.AWS_SERVICES.indexOf(b.tech.toLowerCase());

        const safeIndexA = indexA === -1 ? Number.MAX_SAFE_INTEGER : indexA;
        const safeIndexB = indexB === -1 ? Number.MAX_SAFE_INTEGER : indexB;

        return safeIndexA - safeIndexB;
      });

      console.log("Repositories sorted by AWS_SERVICES: ", this.repositories);
    }
  }

  // Construye el manifiesto después de editar el orden de despliegue
  buildManifest(){
    const oldManifest = { ...this.manifest };

    // Actualizar la lista de repositorios en el manifiesto sin agregar repo
    this.technologies.forEach((tech: string) => {
      this.manifest[tech] = this.repositories.filter((repo: RepoFlat) => repo.tech === tech)
        .map((repo: RepoFlat) => ({
          repository: repo.repository,
          "application-name": repo["application-name"],
          artifact: repo.artifact,
          parallelism: repo.parallelism,
          deployOrder: repo.deployOrder,
          skipRegions: repo.skipRegions
        }));
    });

    // Eliminar tecnologías vacías
    this.technologies.forEach((tech: string) => {
      if (this.manifest[tech].length === 0) {
        delete this.manifest[tech];
      }
    });

    // Ordenar encabezados del manifiesto
    const sortedManifest: any = {};
    const manifestKeys = Object.keys(this.manifest);

    // Mantener las claves no tecnológicas al inicio
    manifestKeys.forEach((key) => {
      if (!Array.isArray(this.manifest[key])) {
        sortedManifest[key] = this.manifest[key];
      }
    });

    // Mantener las claves tecnológicas en orden
    this.technologies.forEach((tech: string) => {
      if (Array.isArray(this.manifest[tech])) {
        sortedManifest[tech] = this.manifest[tech];
      }
    });

    this.manifest = sortedManifest;

    // Agregar llave "customOrder"
    this.manifest.customOrder = true;

    //agregar nueva llave "last_modified"
    this.manifest.last_modified = oldManifest.last_modified || [];
    let user = sessionStorage.getItem("fusuario")
    const date = new Date().toISOString();
    if (!this.manifest.last_modified) {
      this.manifest.last_modified = [{
        author: user,
        date: date
      }];
    } else {
      this.manifest.last_modified.push({
        author: user,
        date: date
      });
    }
  }

  /*
  * ============================================================================
  * Métodos para manipular eventos del Frontend
  * ============================================================================
  */

  // Método que se ejecuta al presionar 'Enter' en el input de REP
  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.chargeData();
    }
  }

  // Método que se ejecuta al presionar el botón 'Guardar'
  confirmChanges(){
    if(this.rep) {
      // Actualizar el manifiesto con el nuevo orden
      this.buildManifest()

      // Guardar cambios en JFrog
      this.getChangeServices.editManifest(this.manifest, this.rep).subscribe(
        (response)=>{
          this.message.create('success', 'Manifiesto editado correctamente');
        },
        (error)=>{
          this.message.create('error', `El manifiesto no se pudo editar`);
        }
      )
      console.log("Manifest to save: ", this.manifest);
      this.isSaveDisabled = true;
    }
  }

  /**
   * ===========================================================================
   * Métodos para manipular el Frontend de arrastrar y soltar
   * ===========================================================================
   */

  // Método que se ejecuta al soltar un elemento arrastrado
  dropRepository(event: CdkDragDrop<RepoFlat[]>) {
    moveItemInArray(this.repositories, event.previousIndex, event.currentIndex);
    this.refreshOrder()
  }

  // Método para eliminar un repositorio de la lista
  deleteRepository(index: number) {
    this.repositories.splice(index, 1);
    this.refreshOrder()
  }

  // Método para refrescar el campo 'deployOrder' en los repositorios
  refreshOrder() {
    // Refrescar deployOrder en repositories
    this.repositories.forEach((repo: RepoFlat, index: number) => {
      repo.deployOrder = index + 1;
    });

    console.log("Updated Repositories with order: ", this.repositories);
    this.isSaveDisabled = false;
  }
  // Método para copiar texto al portapapeles
  copiedIndex: number | null = null;
  copiedField: 'repository' | 'artifact' | null = null;

  copyToClipboard(value: string | number, index: number, field: 'repository' | 'artifact'): void {
    navigator.clipboard.writeText(String(value)).then(() => {
      this.copiedIndex = index;
      this.copiedField = field;

      // Reset visual feedback after 3 seconds
      setTimeout(() => {
        this.copiedIndex = null;
        this.copiedField = null;
      }, 3000);
    }).catch(err => {
      console.error('Error al copiar:', err);
    });
  }

  // Método para abrir el modal de confirmación
  openConfirmationModal(): void {
    const modalRef = this.modal.create({
      nzTitle: 'Confirmar orden de despliegue',
      nzContent: `
        <div class="modal-content">
          <ul>
            ${this.repositories.map((repo: { deployOrder: any; applicationName: any; tech: any; repository: any;}) => `
              <li>
                <strong>${repo.deployOrder ?? '—'}:</strong> ${repo.repository} (${repo.tech})
              </li>
            `).join('')}
          </ul>
        </div>
      `,
      nzFooter: [
        {
          label: 'Cancelar',
          onClick: () => this.modal.closeAll()
        },
        {
          label: 'Confirmar',
          type: 'primary',
          onClick: () => {
            this.confirmChanges();
            modalRef.close();
          }
        }
      ],
      nzMaskClosable: false,
      nzClosable: true,
      nzWrapClassName: 'blurred-modal'
    });
  }

  // Método para abrir links en nueva pestaña
  openLink(url: string): void {
    window.open(url, '_blank');
  }
}
