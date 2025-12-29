// ============================================
// EDITADO: Se agregó OnInit al import
// ============================================
import { Component, OnInit } from '@angular/core';
// NO EDITADO: Importaciones originales
import { Subject, takeUntil } from 'rxjs';
import { Column } from '../../../../core/interfaces/CRQcolumnsList.interface';
import { ListaDeCRQ } from '../../../../core/interfaces/listaCRQ.interface';
import { GetChangesService } from '../../../../core/services/get-changes.service';
import {
  formatDateRange,
  setElementListJfrogCrq,
  getUrlFromA,
  getRepUrl,
} from '../../../../shared/utils';
import { environment } from '../../../../../environments/environment';
import { CommonModule, formatDate } from '@angular/common';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { FrameworkModule } from '../../../../shared/framework.module';
import { Credential } from '../../../../core/interfaces/credential.interface';
import { ExcelReportService } from '../../../../shared/services/excel-report.service';
import { NzMessageService } from 'ng-zorro-antd/message';

// NO EDITADO: Decorador del componente
@Component({
  selector: 'app-reporte-produccion',
  imports: [FrameworkModule, CommonModule, TableComponent],
  standalone: true,
  templateUrl: './reporte-produccion.component.html',
  styleUrl: './reporte-produccion.component.scss',
})
// ============================================
// EDITADO: Se agregó "implements OnInit"
// ============================================
export class ReporteProduccionComponent implements OnInit {
  // NO EDITADO: Propiedades originales
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  credentialPost!: Credential;
  muestraLoading: boolean = false;
  listaDeCRM: ListaDeCRQ[] = [];
  // ============================================
  // EDITADO: Se inicializó date con array vacío
  // Original: date!: Date[];
  // ============================================
  date: Date[] = [];
  // NO EDITADO: Propiedades originales
  data: any[] = [];
  dateFormat = 'dd/MM/yyyy';
  crqInfo: any = '';
  jfrogElements!: any;
  CRQElements!: any;
  initialDate!: string;
  finalDate!: string;
  btnStatus: boolean = true;

  // NO EDITADO: Configuración de columnas
  columns: Column[] = [
    {
      title: 'Cambio',
      key: 'Cambio',
      filtro_visible: false,
      listOfFilter: [],
      filterMultiple: true,
      fixed: 'left',
      filterFn: (Estado: string, item: any) =>
        item.Estado.indexOf(Estado) !== -1,
    },
    {
      title: 'Fecha',
      key: 'Fecha',
      filtro_visible: false,
      listOfFilter: [],
      filterMultiple: true,
      fixed: 'left',
      filterFn: (Estado: string, item: any) =>
        item.Estado.indexOf(Estado) !== -1,
    },
    {
      title: 'Descripción',
      key: 'Descripcion',
      filtro_visible: false,
      listOfFilter: [],
      filterMultiple: true,
      fixed: 'left',
      filterFn: (Estado: string, item: any) =>
        item.Estado.indexOf(Estado) !== -1,
    },
    {
      title: 'Beneficio',
      key: 'Beneficio',
      filtro_visible: false,
      listOfFilter: [],
      filterMultiple: true,
      fixed: 'left',
      filterFn: (Tipo: string, item: any) => item.Tipo.indexOf(Tipo) !== -1,
    },
    {
      title: 'Solicitante',
      key: 'Solicitante',
      filtro_visible: false,
      listOfFilter: [],
      filterMultiple: false,
      fixed: 'left',
      filterFn: (Estado: string, item: any) =>
        item.Estado.indexOf(Estado) !== -1,
    },
    {
      title: 'Implementador',
      key: 'Implementador',
      filtro_visible: false,
      listOfFilter: [],
      filterMultiple: true,
      fixed: 'left',
      filterFn: (Estado: string, item: any) =>
        item.Estado.indexOf(Estado) !== -1,
    },
    {
      title: 'Producto',
      key: 'Producto',
      filtro_visible: false,
      listOfFilter: [],
      filterMultiple: true,
      fixed: 'left',
      filterFn: (Estado: string, item: any) =>
        item.Estado.indexOf(Estado) !== -1,
    },
    {
      title: 'Estado',
      key: 'Estado',
      filtro_visible: false,
      listOfFilter: [
        { text: 'Cerrado', value: 'Cerrado' },
        { text: 'En ejecución del cambio', value: 'En ejecución del cambio' },
        {
          text: 'En revisión post ejecución',
          value: 'En revisión post ejecución',
        },
      ],
      filterMultiple: true,
      fixed: 'left',
      filterFn: (Estado: string, item: any) =>
        item.Estado.indexOf(Estado) !== -1,
    },
    {
      title: 'Aprobado por',
      key: 'aprobador',
      filtro_visible: false,
      listOfFilter: [
      ],
      filterMultiple: true,
      fixed: 'left',
      filterFn: (Estado: string, item: any) =>
        item.Estado.indexOf(Estado) !== -1,
    },
  ];

  // NO EDITADO: Configuración de columnas hijas
  childColumns = [
    { title: 'Justificacion Del Negocio', key: 'JustificacionDelNegocio' },
    { title: 'Documentación Jira', key: 'documentacionJira' },
    { title: 'Areas Involucradas', key: 'areasInvolucradas' },
    { title: 'Elementos:', key: 'Elementos' },
    { title: 'Enlace Jfrog:', key: 'enlaceJfrog' },
  ];

  // NO EDITADO: Constructor original
  constructor(
    private getChangeService: GetChangesService,
    private excelReportService: ExcelReportService,
    private message: NzMessageService
  ) {}

  // ============================================
  // EDITADO: Se agregó el método ngOnInit
  // Este método inicializa la fecha con el día actual
  // ============================================
  ngOnInit(): void {
    // Inicializar con la fecha del día actual
    const today = new Date();
    this.date = [today, today];
    this.btnStatus = false; // Habilitar el botón ya que hay fechas válidas
  }

  // NO EDITADO: Método original
  validateTyme(dates: Date[]): void {
    const startDate = dates[0];
    const finalDate = dates[1];

    // Si alguna de las fechas está vacía, deshabilita el botón
    if (!startDate || !finalDate) {
      this.btnStatus = true;
      return;
    }

    const oneMonthLater = new Date(startDate);
    oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);

    if (finalDate > oneMonthLater) {
      this.btnStatus = true;
      this.message.create(
        'warning',
        `Hay más de un mes de distancia entre ${startDate.toLocaleDateString()} y ${finalDate.toLocaleDateString()}`
      );
    } else {
      this.btnStatus = false;
    }
  }

  // NO EDITADO: Método original
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  // NO EDITADO: Método original
  onChange(): void {
    this.consultardata();
  }

  // NO EDITADO: Método original
  formatDate(): void {
    const fechaInicial = this.date[0];
    const {
      fecha: fechaInicialFormatted,
      diaBusquedaFecha: diaBusquedaFechaInicial,
      listaFechaInicial,
    } = formatDateRange(fechaInicial);

    this.initialDate = listaFechaInicial;
    const fechaFinal = this.date[1];
    const {
      fecha: fechaFinalFormatted,
      diaBusquedaFecha: diaBusquedaFechaFinal,
      listaFechaFinal,
    } = formatDateRange(fechaFinal);
    this.finalDate = listaFechaFinal;
  }

  // NO EDITADO: Método original
  consultardata(): void {
    this.data = [];
    this.listaDeCRM = [];
    this.formatDate();
    this.credentialPost = {
      id: '',
      type: '',
      usuario: sessionStorage.getItem('fusuario') ?? '',
      password: sessionStorage.getItem('fpassword') ?? '',
      timeinicio: this.initialDate,
      tiempofinal: this.finalDate,
    };

    let index: number = 0;
    this.muestraLoading = true;

    this.getChangeService.get_arg_estados('rpt_prod').subscribe((estados) => {
      this.getChangeService
        .postCRQ(this.credentialPost)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((resultado) => {
          for (let i = 0; i < resultado.length; i++) {
            // Filtra los resultados según los estados obtenidos
            if (estados.includes(resultado[i].varEstado)) {
              this.listaDeCRM.push(resultado[i]);
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
              element.varInfra = `<a href='${element.varInfra.replace(
                baseUrl,
                newUrl
              )}' target='_blank'>${element.varCambio2}</a>`;
            }

            //columna enlace rep tabla padre
            if (element.varFechaDeSalida.length >= 10) {
              element.varFechaDeSalida = formatDate(
                element.varFechaDeSalida,
                'dd/MM/yyyy hh:mm a',
                'en-US'
              );
            }
            if (element.varCambio2.includes('REP')) {
              element.REP = element.varCambio2;
              element.varCambio2 = `<a href="${environment.urlAtlasianApi}/browse/${element.varCambio2}" target="_blank">${element.varCambio2}</a>`;
            }
            if (element.varTipo == 'null') {
              element.varTipo = 'Infraestructura';
            }
            this.listaDeCRM.sort(function (a, b) {
              return a.varOrden - b.varOrden;
            });
            index++;
          });

          this.data = this.listaDeCRM.map((element, index) => ({
            key: index,
            REP: element.REP,
            Cambio: element.varCambio2,
            Fecha: element.varFechaDeSalida,
            Descripcion: element.varDescripcion,
            Beneficio: element.varJustificacion,
            Solicitante: element.varResponsable,
            Implementador: element.varImplementador,
            Producto: element.varServiceCI,
            Estado: element.varEstado,
            expand: false,
            children: [
              {
                key: index,
                JustificacionDelNegocio: element.varJustificacion,
                Elementos: element.varListadoElementos,
                enlaceJfrog: element.varInfra,
              },
            ],
          }));
          this.muestraLoading = false;
        });
    });
  }

  // NO EDITADO: Método original
  descargaExcel() {
    let excel:any[] = [];
    excel = this.listaDeCRM.map((element, index) => ({
      key: index,
      Cambio: getRepUrl(element.varCambio2),
      Fecha: element.varFechaDeSalida,
      Descripcion: element.varDescripcion,
      Beneficio: element.varJustificacion,
      Solicitante: element.varResponsable,
      Implementador: element.varImplementador,
      Producto: element.varServiceCI,
      Estado: element.varEstado,
    }));

    this.excelReportService.generateDefaultReport(excel, 'Reporte_Crq.xlsx');
  }

  // NO EDITADO: Método original
  setIndexModal(index: any) {
    this.crqInfo = index;
    this.CRQElements = []
    this.jfrogElements = []
    this.getElements(index.children[0].Elementos);
  }

  // NO EDITADO: Método original
  getUrl(html: string) {
    return getUrlFromA(html);
  }

  // NO EDITADO: Método original
  getElements(elements: string) {
    const listas = setElementListJfrogCrq(elements);
    this.CRQElements = listas[0];
    this.jfrogElements = listas[1];
  }
}