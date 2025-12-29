// ✅ MODIFICADO: Agregar OnInit
import { Component, OnInit } from '@angular/core';
import { FrameworkModule } from '../../../../shared/framework.module';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { Column } from '../../../../core/interfaces/CRQcolumnsList.interface';
import { GetChangesService } from '../../../../core/services/get-changes.service';
import {
  getRepUrl,
  getUrlFromA,
  setElementListJfrogCrq,
  setGeneralCredential,
} from '../../../../shared/utils';
import { ListaDeCRQ } from '../../../../core/interfaces/listaCRQ.interface';
import { CrqsPipe } from '../../../../shared/pipes/crqs.pipe';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { ListaCambiosPipe } from '../../../../shared/pipes/lista-cambios.pipe';
import { environment } from '../../../../../environments/environment';
import { Credential } from '../../../../core/interfaces/credential.interface';

@Component({
  selector: 'app-listado-de-cambios',
  imports: [FrameworkModule, TableComponent, CrqsPipe, ListaCambiosPipe],
  standalone: true,
  templateUrl: './listado-de-cambios.component.html',
  styleUrl: './listado-de-cambios.component.scss',
})
// ✅ MODIFICADO: Implementar OnInit
export class ListadoDeCambiosComponent implements OnInit {
  // ✅ ORIGINAL: Variables del componente
  data: any = [];
  muestraLoading: boolean = false;
  hasExpandColumn: boolean = true;
  elementSearch!: any;
  modeSelect: string = 'Fecha';
  listaDeCRM: ListaDeCRQ[] = [];
  jfrogElements!: any;
  CRQElements!: any;
  index: any = '';
  isVisible: boolean = false;
  appList: any;
  product!: string;
  capaList: any;
  fileList: NzUploadFile[] = [];
  uploading: boolean = false;
  capa: any;
  statusCapa: boolean = true;
  type!: string;
  FilesDelete: any = [];
  isAllCheckedFirstChange = true;
  allChecked = false;
  value: Array<string | number> = [];
  btnStatus: boolean = true;
  dateFormat = 'yyyy/MM/dd';
  
  // 🆕 NUEVO: Variable para estados válidos de Argos
  estadosArgos: string[] = [];

  // ✅ ORIGINAL: Definición de columnas
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
      title: 'JFROG',
      key: 'JFROG',
      filtro_visible: false,
      listOfFilter: [
        { text: 'Abierto', value: 'Abierto' },
        { text: 'Pending', value: 'PENDING' },
        { text: 'Done', value: 'DONE' },
      ],
      filterMultiple: true,
      fixed: 'left',
      filterFn: (JFROG: string, item: any) => item.JFROG.indexOf(JFROG) !== -1,
    },
    {
      title: 'Prioridad',
      key: 'Prioridad',
      filtro_visible: false,
      listOfFilter: [
        { text: 'Medium', value: 'Medium' },
        { text: 'Low', value: 'Low' },
      ],
      filterMultiple: true,
      fixed: 'left',
      filterFn: (Estado: string, item: any) =>
        item.Estado.indexOf(Estado) !== -1,
    },
    {
      title: 'Tipo',
      key: 'Tipo',
      filtro_visible: false,
      listOfFilter: [],
      filterMultiple: true,
      fixed: 'left',
      filterFn: (Tipo: string, item: any) => item.Tipo.indexOf(Tipo) !== -1,
    },
    {
      title: 'Estado',
      key: 'Estado',
      filtro_visible: false,
      listOfFilter: [
        { text: 'Abierto', value: 'Abierto' },
        { text: 'En análisis', value: 'En análisis' },
        { text: '1era Aprobación', value: '1era Aprobación' },
        {
          text: 'Aprobación cambio emergencia',
          value: 'Aprobación cambio emergencia',
        },
        { text: '2da Aprobación', value: '2da Aprobación' },
        { text: 'En Aprobación PO', value: 'En Aprobación PO' },
        {
          text: 'Aprobación Gerente de Turno',
          value: 'Aprobación Gerente de Turno',
        },
        { text: 'En ejecución del cambio', value: 'En ejecución del cambio' },
      ],
      filterMultiple: false,
      fixed: 'left',
      filterFn: (Estado: string, item: any) =>
        item.Estado.indexOf(Estado) !== -1,
    },
    {
      title: 'Clase',
      key: 'Clase',
      filtro_visible: false,
      listOfFilter: [],
      filterMultiple: true,
      fixed: 'left',
      filterFn: (Estado: string, item: any) =>
        item.Estado.indexOf(Estado) !== -1,
    },
  ];

  // ✅ ORIGINAL: Columnas hijas
  childColumns = [
    { title: 'Justificacion Del Negocio', key: 'JustificacionDelNegocio' },
    { title: 'Elementos:', key: 'Elementos' },
    { title: 'Enlace Jfrog:', key: 'enlaceJfrog' },
  ];

  // ✅ ORIGINAL: Constructor
  constructor(
    private getChangeServices: GetChangesService,
    private messageService: NzMessageService
  ) {}

  // 🆕 NUEVO: Método ngOnInit para inicializar fecha
  ngOnInit(): void {
    this.elementSearch = new Date();
  }

  // ✅ ORIGINAL: Validación de botón
  validateButton(): void {
    if (this.modeSelect) {
      if (this.elementSearch) {
        this.btnStatus = false;
      } else {
        this.btnStatus = true;
      }
    }
  }

  // ✅ ORIGINAL: Before upload
  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  };

  // ✅ MODIFICADO: Reset mantiene fecha
  reset() {
    this.elementSearch = new Date();
  }

  // ✅ MODIFICADO: onChange con filtro de estados
  onChange() {
    const todayWithoutFormat: any = this.getFormattedDate();
    const credential: Credential = setGeneralCredential(todayWithoutFormat);
    const { password, usuario } = credential;

    let index: number = 0;
    let body: any = {};
    this.muestraLoading = true;
    this.listaDeCRM = [];
    this.data = [];

    if (this.modeSelect == 'REP') {
      const hoy = new Date();
      const dia = String(hoy.getDate()).padStart(2, '0');
      const mes = String(hoy.getMonth() + 1).padStart(2, '0');
      const año = hoy.getFullYear();

      const fechaFormateada = `${dia}/${mes}/${año}`;
      const timeinicio = `${fechaFormateada} 00:00:00`;
      const tiempofinal = `${fechaFormateada} 23:59:59`;

      this.listaDeCRM = [];
      this.data = [];
      body = {
        password,
        usuario,
        repValue: this.elementSearch,
        timeinicio,
        tiempofinal
      };
    }

    if (this.modeSelect == 'Fecha') {
      const date = new Date(this.elementSearch);

      const formattedDate = String(date.getDate()).padStart(2, '0') + '/' +
        String(date.getMonth() + 1).padStart(2, '0') + '/' +
        date.getFullYear();

      this.listaDeCRM = [];
      this.data = [];
      body = {
        usuario,
        password,
        tiempofinal: `${formattedDate} 23:59:59`,
        timeinicio: `${formattedDate} 00:00:00`
      }
    }

    // 🆕 NUEVO: Cargar estados válidos de Argos primero
    this.getChangeServices.get_arg_estados('pase').subscribe((estados) => {
      this.estadosArgos = estados;

      this.getChangeServices.postCRQ(body).subscribe({
        next: (result) => {
          // 🆕 MODIFICADO: Filtrar por PENDING Y por estados válidos
          for (let i = 0; i < result.length; i++) {
            if (result[i].varJfrogVar == 'PENDING') {
              if (this.estadosArgos.includes(result[i].varEstado)) {
                this.listaDeCRM.push(result[i]);
              }
            }
          }

          // ✅ ORIGINAL: Procesamiento de elementos
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

            if (element.varFechaDeSalida.length >= 18) {
              element.varFechaDeSalida = element.varFechaDeSalida.substring(
                0,
                10
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
            Prioridad: element.varPrioridad,
            Tipo: element.varTipo,
            Estado: element.varEstado,
            Clase: element.varClase,
            Implementador: element.varImplementador,
            JFROG: element.varJfrogVar,
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
        },
        error: (error) => {
          this.muestraLoading = false;
        },
      });
    });
  }

  // ✅ ORIGINAL: Métodos restantes sin cambios
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

  setIndexModal(index: any) {
    this.index = index;
    this.getElements(index.children[0].Elementos);
  }

  getElements(elements: string) {
    const listas = setElementListJfrogCrq(elements);
    this.CRQElements = listas[0];
    this.jfrogElements = listas[1];
  }

  getUrl(html: string) {
    return getUrlFromA(html);
  }

  handleCancel(): void {
    this.isVisible = false;
    this.value = [];
  }

  showModal(type: string): void {
    this.type = type;
    this.fileList = [];
    if (type == 'upFile') {
      this.GetProduct();
    } else {
      this.getFiles();
    }

    this.isVisible = true;
  }

  GetProduct() {
    this.getChangeServices.getServicio().subscribe((data) => {
      this.appList = data;
    });
  }

  postCapa() {
    this.getChangeServices.postCapa(this.product).subscribe({
      next: (response: any) => {
        this.capaList = response;
        this.statusCapa = false;
      },
      error: (error: any) => {
        this.capaList = [`No se pudo cargar la data. Error: ${error}`];
      },
    });
  }

  handleUpload(): void {
    const formData = new FormData();

    this.fileList.forEach((file: any) => {
      formData.append('files[]', file);
    });
    this.uploading = true;
  }

  upload() {
    const CRQ = JSON.stringify(getRepUrl(this.index.Cambio));
    const Producto = JSON.stringify(this.product);
    const Capa = JSON.stringify(this.capa);

    this.getChangeServices
      .upload(this.fileList, CRQ, Producto, Capa)
      .subscribe({
        next: (response: any) => {
        },
        error: (error: any) => {
          this.capaList = [`No se pudo cargar la data. Error: ${error}`];
        },
      });

    this.isVisible = false;
  }

  splitFiles(value: string) {
    const newPath: string = value.replace('/liberaciones/devqa/', '');
    return newPath;
  }

  getFiles() {
    const CRQ: string = getRepUrl(this.index.Cambio) ?? '';
    let files: any[] = [];

    this.getChangeServices.getFiles(CRQ).subscribe({
      next: (response: any) => {
        files = response;
        this.FilesDelete = files.map((file: any) => ({
          label: this.splitFiles(file.value),
          value: file.value,
        }));
      },
      error: (error: any) => {
      },
    });
  }

  updateSingleChecked(): void {
    this.allChecked = this.value.length === this.FilesDelete.length;
  }

  updateAllChecked(): void {
    if (!this.isAllCheckedFirstChange) {
      this.value = this.allChecked
        ? this.FilesDelete.map((item: { value: any }) => item.value)
        : [];
    }
    this.isAllCheckedFirstChange = false;
  }

  deletFiles(): void {
    const deletefiles = JSON.parse(JSON.stringify(this.value));
    this.getChangeServices.deletedFiles(deletefiles).subscribe({
      next: (response) => {
      },
      error: (e) => {
      },
    });
    this.value = [];
    this.isVisible = false;
  }
}