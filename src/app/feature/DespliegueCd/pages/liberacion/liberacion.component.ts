import { GetChangesService } from './../../../../core/services/get-changes.service';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FrameworkModule } from '../../../../shared/framework.module';
import { ListaDeCRQ } from '../../../../core/interfaces/listaCRQ.interface';
import { setGeneralCredential } from '../../../../shared/utils';
import { environment } from '../../../../../environments/environment';
import {
  Clase,
  Estado,
  Jfrog,
  Liberaciones,
  Prioridad,
  Entorno,
  Tipo,
} from '../../../../core/interfaces/liberaciones.interfaces';
import { ModalComponent } from './modal/modal.component';

@Component({
  selector: 'app-liberacion',
  imports: [FrameworkModule, ModalComponent],
  templateUrl: './liberacion.component.html',
  styleUrl: './liberacion.component.scss',
})
export class LiberacionComponent {
  data: Liberaciones[] = [];
  muestraLoading: boolean = false;
  elementSearch: string = '';
  listSelectReeliberar: string[] = [];
  modeSelect: string = 'Fecha';
  dateSearch: Date = new Date();
  listaDeCRM: ListaDeCRQ[] = [];
  estados!: any;
  btnStatus: boolean = false;
  entornos!: any;
  isProcessing:boolean = false;

  // Filtros
  searchCambio = '';
  searchImplementador = '';
  searchServicio = '';
  visibleCambio = false;
  visibleImplementador = false;
  visibleServicio = false;
  dataFiltered = this.data;
  isfilter = false;
  sortByFecha = (a: any, b: any) => (a.Fecha?.getTime() ?? 0) - (b.Fecha?.getTime() ?? 0);

  constructor(
    private getChangeServices: GetChangesService,
    private cdr: ChangeDetectorRef
  ) {}

  search(): void {
    if (this.isfilter) {
      this.data = this.dataFiltered
      this.isfilter =false
    }
    if (this.isfilter == false) {
      this.visibleCambio = false;
      this.visibleImplementador = false;
      this.visibleServicio = false;
      this.data = this.data.filter((item: Liberaciones) => item.Cambio?.toLowerCase().indexOf(this.searchCambio.toLowerCase()) !== -1);
      this.data = this.data.filter((item: Liberaciones) => item.Implementador?.toLowerCase().indexOf(this.searchImplementador.toLowerCase()) !== -1);
      this.data = this.data.filter((item: Liberaciones) => item.SERVICIO?.toLowerCase().indexOf(this.searchServicio.toLowerCase()) !== -1);
      this.isfilter = true
    }
  }

  resetFilter(): void {
    this.searchCambio = '';
    this.searchImplementador = '';
    this.searchServicio = '';
    this.visibleCambio = false;
    this.visibleImplementador = false;
    this.visibleServicio = false;
    this.data = this.dataFiltered
  }

  reset() {
    this.elementSearch = '';
    this.listSelectReeliberar = [];
  }

  getFormattedDate = (): string => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short',
      timeZone: 'America/Bogota',
    };

    const now = new Date().toLocaleString('en-US', options);
    return `${now} (hora estándar de Colombia)`;
  };

  validateButton(): void {
    if (this.modeSelect == 'REP') {
      if (this.elementSearch) {
        this.btnStatus = false;
      } else {
        this.btnStatus = true;
      }
    } else {
      if (this.dateSearch) {
        this.btnStatus = false;
      } else {
        this.btnStatus = true;
      }
    }
  }

  onChange() {
    if (this.isProcessing) {
      return;
    }
    this.isProcessing = true;


    this.btnStatus = false;
    let index: number = 0;
    let body: any = {};
    this.muestraLoading = true;
    this.listaDeCRM = [];
    this.data = [];

    // Resetear filtros
    this.searchCambio = '';
    this.searchImplementador = '';
    this.searchServicio = '';
    this.visibleCambio = false;
    this.visibleImplementador = false;
    this.visibleServicio = false;

    if (this.modeSelect === 'REP') {
      this.listaDeCRM = [];
      this.data = [];

      const todayWithoutFormat: any = this.getFormattedDate();
      const credential: Credential = setGeneralCredential(todayWithoutFormat);

      body = {
        ...credential,
        repValue: this.elementSearch,
      };
    }

    if (this.modeSelect === 'Fecha') {
      const credential: Credential = setGeneralCredential(this.dateSearch);
      this.listaDeCRM = [];
      this.data = [];
      body = credential;
    }

    this.getChangeServices.get_arg_estados('libera').subscribe((estado) => {
      this.estados = estado;

      this.getChangeServices.postCRQ(body).subscribe({
        next: (result) => {
          for (let i = 0; i < result.length; i++) {
            if (result[i].varJfrogVar === 'DONE') {
              if (this.estados.includes(result[i].varEstado)) {
                this.listaDeCRM.push(result[i]);
              }
            }
          }

          this.listaDeCRM.forEach((element) => {
            const indice = environment.listaEstados.indexOf(
              element.varRequestType
            );
            element.varOrden = indice >= 0 ? indice : 100;

            if (element.varInfra.length > 10) {
              const toArrayinfra = element.varInfra.split('\n');

              if (toArrayinfra.length > 3) {
                const matchedLink = toArrayinfra.find((link) =>
                  link.includes(element.varCambio2 + '.')
                );
                element.varInfra = matchedLink || toArrayinfra[0];
              } else {
                element.varInfra = toArrayinfra[0];
              }

              const baseUrl = `${environment.urlJfrogApi}/api/storage/change-request/`;
              const newUrl = `${environment.urlJfrogApi}/change-request/`;
              element.varInfra = element.varInfra.replace(baseUrl, newUrl);
            }


            if (element.varCambio2.includes('REP')) {
              element.varCambio = element.varCambio2;
              element.varCambio2 = `${environment.urlAtlasianApi}/browse/${element.varCambio2}`;
            }

            if (element.varTipo === 'null') {
              element.varTipo = 'Infraestructura';
            }

            this.listaDeCRM.sort((a, b) => a.varOrden - b.varOrden);
            index++;
          });

          this.data = this.listaDeCRM.map((element, index) => ({
            key: index,
            Rep: element.varCambio,
            Cambio: element.varCambio2,
            Fecha: new Date(element.varFechaDeSalida),
            Prioridad: element.varPrioridad as Prioridad,
            Tipo: element.varTipo as Tipo,
            Estado: element.varEstado as Estado,
            Clase: element.varClase as Clase,
            Descripcion: element.varDescripcion,
            Implementador: element.varImplementador,
            JFROG: element.varJfrogVar as Jfrog,
            SERVICIO: element.varServiceCI,
            expand: false,
            children: [
              {
                key: index,
                JustificacionDelNegocio: element.varJustificacion,
                Elementos: element.varListadoElementos,
                enlaceJfrog: element.varInfra,
              },
            ],
            pipelines: []
          }));
          this.data.forEach((item, index) => {
            this.getChangeServices
              .get_user_job(item, this.dateSearch)
              .subscribe({
                next: (response: any) => {
                    this.isProcessing = false;
                  response.forEach((users: any) => {
                    // Actualiza el objeto y reasigna el array para que Angular lo detecte
                    const updatedItem = {
                      ...item,
                      Usuario: users.l_user,
                      Fecha_Ejecucion:  users.fecha_liberacion,
                      pipelines: response
                    };

                    this.data[index] = updatedItem;
                    this.data = [...this.data]; // Reasignación para que Angular detecte el cambio
                    this.cdr.detectChanges(); // Forzar la detección de cambios si es necesario
                  });
                },
                error: (error) => {
                  this.isProcessing = false;
                  this.muestraLoading = false;
                  this.btnStatus = true;
                  console.log(error);
                },
              });
          });
          this.muestraLoading = false;
          this.btnStatus = true;
          this.dataFiltered = this.data;
        },
        error: (error) => {
          this.isProcessing = false;
          this.muestraLoading = false;
          this.btnStatus = true;
          console.log(error);
        },
      });
    });

    this.getChangeServices.get_arg_entornos('libera').subscribe((entornosValidos) => {
      this.isProcessing = false;
      this.entornos = entornosValidos.map((e: any) => e.entorno?.trim());
    });
  }

  activeModal: number | null = null;

  toggleModal(index: number): void {
    this.activeModal = index;
  }

  trackByIndex(index: number, item: any): number {
    return index;
  }
}
