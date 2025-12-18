import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';
import { CommonModule } from '@angular/common';
import { Liberaciones } from '../../../../../core/interfaces/liberaciones.interfaces';
import { setElementListJfrogCrq } from '../../../../../shared/utils';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { GetChangesService } from '../../../../../core/services/get-changes.service';
import { DeployStatus } from '../../../../../core/interfaces/deployStatus';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzMessageService } from 'ng-zorro-antd/message';
import {
  catchError,
  forkJoin,
  Observable,
  of,
  tap,
  map,
  finalize,
  pipe,
  Subscription,
  exhaustMap,
  timer,
} from 'rxjs';
import { environment } from '../../../../../../environments/environment';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzInputModule } from 'ng-zorro-antd/input';
@Component({
  selector: 'app-modal',
  imports: [
    NzModalModule,
    NzButtonModule,
    NzIconModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NzSelectModule,
    NzFormModule,
    NzStepsModule,
    NzCheckboxModule,
    NzInputModule,
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @Input() data!: Liberaciones;
  @Input() isActive: boolean = false;
  @Output() close = new EventEmitter<void>();

  //modal
  isVisible = false;
  isConfirmLoading = false;

  //parametros
  tecnologyOptions: string[] = [
    'CD-DATABASES',
    'CD-LIFERAY',
    'CD-DATASERVICES',
    'CD-GROOVY',
    'CD-IBUS',
    'CD-MQM',
    'CD-SQR',
    'CD-APPCONNECT',
    'CD-SERVICIOS-JAVA',
    'CD-DATAPOWER',
  ];
  listOfSelectedValue: string[] = [];

  listOfOptionEnv: string[] = ['Prod', 'Dr'];
  selectEnv: string = '';

  btnLoading: boolean = false;
  isButtonEnabled: boolean = false;

  //elementosCRQ
  CRQElements: string[] = [];
  jfrogElements: string[] = [];
  groupedDeployStatus: { [key: string]: any[] } = {};
  deployStatus: DeployStatus[] = [];
  listFilterJob: any[] = [];
  private chequeoSub: Subscription | null = null;

  //modal action
  isVisibleAction: boolean = false;
  jobMessage: any = '';
  currentJob: string = '';
  colorButton: string = '';

  //modal reversa
  isVisibleReversa: boolean = false;
  reversarTodo: boolean = true;
  reversarElementos: string = '';
  reversaLoading: boolean = false;

  constructor(
    private modal: NzModalService,
    private getChangeServices: GetChangesService,
    private message: NzMessageService,
    private cdr: ChangeDetectorRef
  ) {}

  //modal
  async showModal(): Promise<void> {
    this.isVisible = true;
    await this.checkStatus();

    const elementos = this.data.children?.[0]?.Elementos;
    if (elementos) {
      this.getElements(elementos);
    }
  }

  handleOk(): void {
    this.isConfirmLoading = true;

    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 1000);
  }

  handleCancel(): void {
    this.detenerChequeoPeriodico();
    this.updateButtonColor();
    this.isVisible = false;
  }

  checkStatus(): void {
    const rep = this.data?.Rep ?? '';

    this.detenerChequeoPeriodico(); // Cancelar si ya está corriendo

    this.chequeoSub = timer(0, 5000)
      .pipe(exhaustMap(() => this.getChangeServices.check_estado(rep)))
      .subscribe({
        next: (response: any) => {
          this.deployStatus = response;
          this.listFilterJob = this.getJobListStatus();
          this.agruparStatus();
        },
        error: (error: any) => {
          console.error('Error al obtener estados de los pipelines:', error);
        },
      });
  }

  hasGroupedDeployStatus(): boolean {
    return (
      !!this.groupedDeployStatus &&
      Object.keys(this.groupedDeployStatus).length > 0
    );
  }

  detenerChequeoPeriodico(): void {
    this.chequeoSub?.unsubscribe();
    this.chequeoSub = null;
  }

  agruparStatus(): void {
    this.groupedDeployStatus = this.deployStatus.reduce(
      (acc: Record<string, any[]>, item) => {
        if (item.url !== 0) {
          acc[item.estado] = acc[item.estado] || [];
          acc[item.estado].push(item);
        }
        return acc;
      },
      {}
    );
    this.cdr.detectChanges();
  }

  confirmDeploy(): void {
    try {
      const tecnologias = this.listOfSelectedValue.join(', ');
      this.modal.confirm({
        nzTitle: '<i>¿Estás seguro de querer liberar?</i>',
        nzContent: `<p>Se liberarán las siguientes tecnologías: <strong>${tecnologias}</strong> en <strong>${this.selectEnv}</strong></p>`,
        nzOnOk: () => this.deploy(),
      });
    } catch (error) {
      console.error('Error al verificar el estado antes de liberar:', error);
    }
  }

  deploy(): void {
    const rep = this.data?.Rep ?? '';
    const jfrogUrl = this.data?.children?.[0]?.enlaceJfrog ?? '';
    const jobsDeployed = this.data?.pipelines ?? [];
    const env = this.selectEnv.toLowerCase();

    this.btnLoading = true;

    const observables = this.listOfSelectedValue.map((job: string) => {
      const jobLower = job.toLowerCase();
      const pipeline = jobsDeployed.find(
        (p: any) => p.nomb_estado === jobLower
      );

      this.message.success(
        `${pipeline ? 'Reliberación' : 'Liberación'} iniciada del job ${job}`
      );

      const serviceCall = pipeline
        ? this.getChangeServices.Reliberar(
            rep,
            jobLower,
            jfrogUrl,
            pipeline.url,
            env
          )
        : this.getChangeServices.liberar(rep, jobLower, jfrogUrl, env);

      return serviceCall.pipe(catchError(() => of(null)));
    });

    forkJoin(observables).subscribe(() => {
      this.btnLoading = false;
      this.selectEnv = '';
      this.listOfSelectedValue = [];
    });
  }

  checkStatusJob(job: string): void {
    this.isVisibleAction = true;
    this.currentJob = job;
    const rep = this.data?.Rep ?? '';

    this.getChangeServices.check_estado_active_job(rep, job).subscribe({
      next: ([mensaje]) => {
        this.jobMessage = mensaje;
      },
      error: (error) => {
        console.error('Error al consultar estado del job:', error);
      },
    });
  }

  actionDeploy(action: string): void {
    this.ejecutarAccionDeploy(action, this.currentJob, this.jobMessage.url);
    this.cancelJob();
  }

  ejecutarAccionDeploy(action: string, job: string, jobUrl: string): void {
    const rep = this.data?.Rep ?? '';

    this.getChangeServices
      .act_deplot(rep, jobUrl, action, job.toLowerCase())
      .subscribe({
        next: () => {
          console.log(
            `Acción ${action} ejecutada correctamente en el job ${job}`
          );
        },
        error: (error) => {
          console.error('Error al ejecutar acción de despliegue:', error);
        },
      });
  }

  //boton
  getColor(jobs: any[]): string {
    if (!Array.isArray(jobs)) {
      console.info('getColor recibió un valor no válido:', jobs);
      return '#1890ff'; // Color por defecto
    }

    const colors: Record<string, string> = {
      Fallo: '#FF5964',
      Abortado: '#D7D7D7',
      'Necesito Activar': '#ffe74c',
      Liberado: '#58BC82',
      Liberando: '#35A7FF',
      SUCCESS: '#58BC82',
    };

    const estadoValido = jobs.find(
      (job) => job.estado && job.estado.trim() !== 'Sin Liberar'
    );
    return estadoValido
      ? colors[estadoValido.estado.trim()] || '#1890ff'
      : '#1890ff';
  }

  updateButtonColor(): void {
    this.colorButton = this.getColor(this.data.pipelines);
    this.cdr.detectChanges(); // Forzar actualización del DOM
  }
  //agrupar por estado

  //generales
  extraerNumeroDesdeHTML(html: string): string | null {
    const match = html.match(/\/(\d+)\/consoleText/);
    return match ? match[1] : null;
  }

  cancelJob(): void {
    this.isVisibleAction = false;
    this.currentJob = '';
  }

  getElements(elements: string) {
    const listas = setElementListJfrogCrq(elements);

    this.CRQElements = listas[0];
    this.jfrogElements = listas[1];
  }

  getJobListStatus(): any[] {
    this.deployStatus.forEach((job) => {
      const { url, nomb_estado } = job;
      if (url != 0) {
        job.url = `<a href='https://jenkinsbg.bgeneral.com/${environment.jenkinsUrl}/job/${nomb_estado}/${url}/consoleText' target='_blank'>${url}</a>`;
      }
    });
    return this.deployStatus.filter((job) => job.url !== 0);
  }

  getUrl(html: any): string | any {
    if (typeof html !== 'string') {
      // console.warn('Valor no válido para extraer href:', html);
      return null;
    }

    const regex = /href='(.*?)'/;
    const resultado = html.match(regex);

    return resultado ? resultado[1] : null;
  }

  modalReversar(): void {
    this.isVisibleReversa = true;
  }

  reversarAction(): void {
    const rep = this.data?.Rep ?? '';
    const jfrogUrl = this.data?.children?.[0]?.enlaceJfrog ?? '';
    this.reversaLoading = true;

    const requests = this.listOfSelectedValue.map((tec) => {
      const obs = this.reversarTodo
        ? this.getChangeServices.reversaCompleta(rep, jfrogUrl, tec) // <- debe devolver Observable<string> si hiciste el cambio de responseType='text'
        : this.getChangeServices.reversaElementos(
            rep,
            jfrogUrl,
            this.reversarElementos,
            tec
          );

      // Convertimos cada respuesta/err en un objeto que podamos revisar
      return obs.pipe(
        map((resp) => ({ tec, ok: true, resp })), // éxito
        catchError((err) => of({ tec, ok: false, err })) // error -> no rompemos forkJoin
      );
    });

    // Ejecutamos todas a la vez
    forkJoin(requests)
      .pipe(
        finalize(() => {
          this.reversaLoading = false;
          this.isVisibleReversa = false;
          this.reversarElementos = '';
        })
      )
      .subscribe({
        next: (results) => {
          // results: Array<{ tec: string; ok: boolean; resp?: any; err?: any }>
          // Mensajes por cada tecnología
          results.forEach(({ tec, ok }) => {
            if (ok) {
              const msg = this.reversarTodo
                ? `Se ejecutó la reversa correctamente del job ${tec}`
                : `Se ejecutó la reversa de los elementos del job ${tec}`;
              this.message.success(msg);
            } else {
              const msg = this.reversarTodo
                ? `No se pudo ejecutar la reversa de la tecnológica ${tec} correctamente`
                : `No se pudo ejecutar la reversa de los elementos de la tecnológica ${tec} correctamente`;
              this.message.error(msg);
            }
          });

          // Si quieres un resumen final:
          const okCount = results.filter((r) => r.ok).length;
          const failCount = results.length - okCount;
          if (failCount === 0) {
            this.message.success(
              `Todas las reversas se ejecutaron correctamente (${okCount}).`
            );
          } else {
            this.message.warning(
              `Reversas completadas con errores: OK ${okCount}, Fallas ${failCount}.`
            );
          }

          this.reversarElementos = '';
        },
        error: (err) => {
          console.error('Error inesperado en el conjunto:', err);
          this.message.error(
            'Ocurrió un error general al ejecutar las reversas.'
          );
          this.reversarElementos = '';
        },
      });
  }

  handleCancelReversa(): void {
    this.isVisibleReversa = false;
    this.listOfSelectedValue = [];
    this.reversarTodo = true;
    this.reversarElementos = '';
  }
}
