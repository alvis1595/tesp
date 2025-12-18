import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { GetChangesService } from '../../../../core/services/get-changes.service';
import { CommonModule, formatDate } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { ListaDeCRQ } from '../../../../core/interfaces/listaCRQ.interface';
import { Credential } from '../../../../core/interfaces/credential.interface';
import { environment } from '../../../../../environments/environment';
import { FrameworkModule } from '../../../../shared/framework.module';
import { Column } from '../../../../core/interfaces/CRQcolumnsList.interface';
import { formatDateRange, getUrlFromA, setElementListJfrogCrq, setGeneralCredential } from '../../../../shared/utils';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [ FrameworkModule, TableComponent, CommonModule],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss'
})
export class TodosComponent {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  date!: Date;
  show: boolean = false;
  diaBusquedaFecha: string = "";
  muestraLoading: boolean = false;
  muestragrid: boolean = true;
  listaDeCRM: ListaDeCRQ[] = [];
  templistaDeCRM: ListaDeCRQ[] = [];
  listaCredential: Credential[] = [];
  toArrayinfra: string [] = [];
  listaFechaInicial: string = "";
  listaFechaFinal: string = "";
  fecha: string = "";
  fusuario: string = "";
  fpassword: string = "";
  froles: string = "";
  crqInfo: any = '';
  jfrogElements!:any;
  CRQElements!:any;
  btnStatus:boolean = true;


  childColumns = [
    { title: 'Justificacion Del Negocio', key: 'JustificacionDelNegocio' },
    { title: 'Elementos:', key: 'Elementos'},
    { title: 'Enlace Jfrog:', key: 'enlaceJfrog' }
  ];

  columns: Column[] = [
    {
      title: 'Cambio',
      key: 'Cambio',
      filtro_visible: false,
      listOfFilter: [],
      filterMultiple: true,
      fixed: "left",
      filterFn: (Estado: string, item: any) => item.Estado.indexOf(Estado) !== -1
    },
    {
      title: 'Fecha',
      key: 'Fecha',
      filtro_visible: false,
      listOfFilter: [],
      filterMultiple: true,
      fixed: "left",
      filterFn: (Estado: string, item: any) => item.Estado.indexOf(Estado) !== -1
    },
    {
      title: 'JFROG',
      key: 'JFROG',
      filtro_visible: false,
      listOfFilter: [
        { text: 'Abierto', value: 'Abierto' },
        { text: 'Pending', value: 'PENDING' },
        { text: 'Done', value: 'DONE'}
      ],
      filterMultiple: true,
      fixed: "left",
      filterFn: (JFROG: string, item: any) => item.JFROG.indexOf(JFROG) !== -1
    },
    {
      title: 'Prioridad',
      key: 'Prioridad',
      filtro_visible: false,
      listOfFilter: [
        { text: 'Medium', value: 'Medium' },
        { text: 'Low', value: 'Low' }
      ],
      filterMultiple: true,
      fixed: "left",
      filterFn: (Estado: string, item: any) => item.Estado.indexOf(Estado) !== -1
    },
    {
      title: 'Tipo',
      key: 'Tipo',
      filtro_visible: false,
      listOfFilter: [

      ],
      filterMultiple: true,
      fixed: "left",
      filterFn: (Tipo: string, item: any) => item.Tipo.indexOf(Tipo) !== -1
    },
    {
      title: "Estado",
      key: "Estado",
      filtro_visible: false,
      listOfFilter: [
        { text: 'Abierto', value: 'Abierto' },
        { text: 'En análisis', value: 'En análisis' },
        { text: '1era Aprobación', value: '1era Aprobación' },
        { text: 'Aprobación cambio emergencia', value: 'Aprobación cambio emergencia' },
        { text: '2da Aprobación', value: '2da Aprobación' },
        { text: 'En Aprobación PO', value: 'En Aprobación PO' },
        { text: 'Aprobación Gerente de Turno', value: 'Aprobación Gerente de Turno' },
        { text: 'En ejecución del cambio', value: 'En ejecución del cambio' },
      ],
      filterMultiple: false,
      fixed: "left",
      filterFn: (Estado: string, item: any) => item.Estado.indexOf(Estado) !== -1
    },
    {
      title: 'Clase',
      key: 'Clase',
      filtro_visible: false,
      listOfFilter: [
      ],
      filterMultiple: true,
      fixed: "left",
      filterFn: (Estado: string, item: any) => item.Estado.indexOf(Estado) !== -1
    },
    {
      title: 'Grupo informador',
      key: 'Grupoinformador',
      filtro_visible: false,
      listOfFilter: [
      ],
      filterMultiple: true,
      fixed: "left",
      filterFn: (Estado: string, item: any) => item.Estado.indexOf(Estado) !== -1
    },
    {
      title: 'Implementador',
      key: 'Implementador',
      filtro_visible: false,
      listOfFilter: [
      ],
      filterMultiple: true,
      fixed: "left",
      filterFn: (Estado: string, item: any) => item.Estado.indexOf(Estado) !== -1
    },
  ];

  data: any[]=[];
  hasExpandColumn = true

  constructor(
    private getChangeService: GetChangesService) {}

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onChange(): void {
    const result: Date  = this.date
    const { fecha, diaBusquedaFecha, listaFechaInicial, listaFechaFinal } = formatDateRange(result)

    this.fecha = fecha
    this.diaBusquedaFecha = diaBusquedaFecha;
    this.listaFechaInicial = listaFechaInicial;
    this.listaFechaFinal = listaFechaFinal;

    this.consultardata();
  }

  consultardata() {

    this.muestraLoading=true;

    const data1: Credential = setGeneralCredential(this.date)
    this.listaCredential.push(data1)
    let index: number;
    index = 0;

    this.getChangeService.postCRQ(data1).pipe(takeUntil(this.ngUnsubscribe)).subscribe(resultado =>
      {
        this.listaDeCRM = resultado
        this.listaDeCRM.forEach(element => {
        var indice = environment.listaEstados.indexOf(element.varEstado)
        if (indice >= 0) {
          element.varOrden = indice;
        } else {
          element.varOrden = 100;
        }

        // Columna enlace JFrog tabla hijo
        if (element.varInfra.length > 10) {
          this.toArrayinfra = element.varInfra.split("\n");

          if (this.toArrayinfra.length > 3) {
              element.varInfra = this.toArrayinfra.find(link => link.includes(element.varCambio2 + ".")) || this.toArrayinfra[0];
          } else {
              element.varInfra = this.toArrayinfra[0];
          }

          element.varInfra = `<a href="${element.varInfra.replace("https://bgxpa.jfrog.io/artifactory/api/storage/change-request/", "https://bgxpa.jfrog.io/artifactory/change-request/")}" target="_blank">${element.varCambio2}</a>`;
        }

          //columna enlace rep tabla padre
          if (element.varFechaDeSalida.length>=18){
            element.varFechaDeSalida = element.varFechaDeSalida.substring(0,8)+this.diaBusquedaFecha
          }
          if (element.varCambio2.includes('REP')){
            element.REP = element.varCambio2;
            element.varCambio2 ="<a href='https://bgx-pa.atlassian.net/browse/"+element.varCambio2+"'  target='_blank' >"+element.varCambio2+"</a>"
          }
          if (element.varTipo == "null"){
            element.varTipo ="Infraestructura"
          }
          this.listaDeCRM.sort(function(a, b) { return a.varOrden - b.varOrden; });
          index ++;
        });

        this.data = this.listaDeCRM.map((element, index) => ({
          key: (index),
          REP : element.REP,
          Cambio: element.varCambio2,
          Fecha: element.varFechaDeSalida,
          JFROG: element.varJfrogVar,
          Prioridad: element.varPrioridad,
          Tipo: element.varTipo,
          Estado: element.varEstado,
          Clase: element.varClase,
          Grupoinformador: element.varGrupoInformador,
          Implementador: element.varImplementador,
          expand: false,
          children: [
            {
              key: (index),
              JustificacionDelNegocio: element.varJustificacion,
              Elementos: element.varListadoElementos,
              enlaceJfrog: element.varInfra
            }
          ]
        })
      );
      this.muestraLoading=false
    });
  }

  setIndexModal(index:any){
    this.crqInfo = index;
    this.CRQElements = []
    this.jfrogElements = []
    this.getElements(index.children[0].Elementos)

  }

  getUrl(html:string){
    return getUrlFromA(html)
  }

  validateButton():void {
    if(this.date){
      this.btnStatus = false;
    }else {
      this.btnStatus = true;
    }
  }

  getElements(elements:string) {
    const listas = setElementListJfrogCrq(elements)
    this.CRQElements = listas[0];
    this.jfrogElements = listas[1];
  }

}


