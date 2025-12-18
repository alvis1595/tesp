import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { FrameworkModule } from '../../../../shared/framework.module';
import { GetChangesService } from '../../../../core/services/get-changes.service';
import { Column } from '../../../../core/interfaces/CRQcolumnsList.interface';
import { Subject, takeUntil } from 'rxjs';
import { ListaDeCRQ } from '../../../../core/interfaces/listaCRQ.interface';
import { formatDateRange, getUrlFromA, setElementList, setElementListJfrogCrq, setGeneralCredential } from '../../../../shared/utils';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-produccion',
  imports: [FrameworkModule, CommonModule, TableComponent],
  standalone: true,
  templateUrl: './produccion.component.html',
  styleUrl: './produccion.component.scss'
})
export class ProduccionComponent implements OnDestroy {
    private ngUnsubscribe: Subject<void> = new Subject<void>();
    credentialPost!: Credential;
    muestraLoading: boolean = false;
    listaDeCRM: ListaDeCRQ[] = [];
    date!: Date;
    data: any[] = [];
    crqInfo: any = '';
    jfrogElements!:any;
    CRQElements!:any;
    btnStatus:boolean = true;

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

    childColumns = [
      { title: 'Justificacion Del Negocio', key: 'JustificacionDelNegocio' },
      { title: 'Elementos:', key: 'Elementos'},
      { title: 'Enlace Jfrog:', key: 'enlaceJfrog' }
    ];

  constructor(
    private getChangeService: GetChangesService) {}


  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onChange(): void {
    this.consultardata();
  }

  consultardata():void {
    this.credentialPost = setGeneralCredential(this.date)
    const { fecha, diaBusquedaFecha, listaFechaInicial, listaFechaFinal } = formatDateRange(this.date)
    let index: number = 0;
    this.muestraLoading = true;

    this.getChangeService.get_arg_estados("prod").subscribe(estados => {

      this.getChangeService.postCRQ(this.credentialPost).pipe(takeUntil(this.ngUnsubscribe)).subscribe(resultado => {
        for (let i = 0; i < resultado.length; i++) {
          // Filtra los resultados según los estados obtenidos
          if (estados.includes(resultado[i].varEstado)) {
            this.listaDeCRM.push(resultado[i]);
          }
        }


        this.listaDeCRM.forEach(element => {
          const indice = environment.listaEstados.indexOf(element.varRequestType);
          element.varOrden = (indice >= 0) ? indice : 100;

          if (element.varInfra.length > 10) {
            const toArrayinfra = element.varInfra.split("\n");

            if (toArrayinfra.length > 3) {
              const matchedLink = toArrayinfra.find(link => link.includes(element.varCambio2 + "."));
              element.varInfra = matchedLink || toArrayinfra[0];
            } else {
              element.varInfra = toArrayinfra[0];
            }

            const baseUrl = `${environment.urlJfrogApi}/api/storage/change-request/`;
            const newUrl = `${environment.urlJfrogApi}/change-request/`;
            element.varInfra = `<a href='${element.varInfra.replace(baseUrl, newUrl)}' target='_blank'>${element.varCambio2}</a>`;
          }


          //columna enlace rep tabla padre
          if (element.varFechaDeSalida.length>=18){
            element.varFechaDeSalida = element.varFechaDeSalida.substring(0,8) + diaBusquedaFecha
          }
          if (element.varCambio2.includes('REP')){
            element.REP = element.varCambio2;
            element.varCambio2 = `<a href="${environment.urlAtlasianApi}/browse/${element.varCambio2}" target="_blank">${element.varCambio2}</a>`;
          }
          if (element.varTipo == "null"){
            element.varTipo ="Infraestructura"
          }
          this.listaDeCRM.sort(function(a, b) { return a.varOrden - b.varOrden; });
          index ++;

        });

        this.data = this.listaDeCRM.map((element, index) => ({
          key: (index),
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
              key: (index),
              JustificacionDelNegocio: element.varJustificacion,
              Elementos: element.varListadoElementos,
              enlaceJfrog: element.varInfra,
            }
          ]
        }));

        this.muestraLoading=false;

        })
      }
    );
  }

    validateButton():void {
    if(this.date){
      this.btnStatus = false;
    }else {
      this.btnStatus = true;
    }
  }

  setIndexModal(index:any){
    this.crqInfo = index;
    this.CRQElements = [];
    this.jfrogElements = [];
    this.getElements(index.children[0].Elementos)
  }

  getUrl(html:string){
    return getUrlFromA(html)
  }

  getElements(elements:string) {
    const listas = setElementListJfrogCrq(elements)
    this.CRQElements = listas[0];
    this.jfrogElements = listas[1];
  }
}
