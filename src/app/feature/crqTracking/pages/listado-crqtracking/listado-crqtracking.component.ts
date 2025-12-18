import { Component } from '@angular/core';
import { FrameworkModule } from '../../../../shared/framework.module';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { Column } from '../../../../core/interfaces/CRQcolumnsList.interface';
import { GetChangesService } from '../../../../core/services/get-changes.service';
import {
  formatDateRange,
  setDateFormatCRQTracking,
} from '../../../../shared/utils';

@Component({
  selector: 'app-listado-crqtracking',
  imports: [FrameworkModule, TableComponent],
  standalone: true,
  templateUrl: './listado-crqtracking.component.html',
  styleUrl: './listado-crqtracking.component.scss',
})
export class ListadoCRQTrackingComponent {
  elementSearch!: any;
  modeSelect: string = 'Fecha';
  data: any[] = [];
  muestraLoading: boolean = false;
  hasExpandColumn: boolean = false;
  btnStatus: boolean = true;

  private previousValue: string = '';

  columns: Column[] = [
    {
      title: 'Cambio',
      key: 'ct_crq_number',
      filtro_visible: false,
      listOfFilter: [],
      filterMultiple: true,
      fixed: 'left',
      filterFn: (Estado: string, item: any) =>
        item.Estado.indexOf(Estado) !== -1,
    },
    {
      title: 'Estado',
      key: 'st_descripcion',
      filtro_visible: false,
      listOfFilter: [
        { text: 'Success', value: 'Success' },
        { text: 'Failed', value: 'Failed' },
      ],
      filterMultiple: true,
      fixed: 'left',
      filterFn: (st_descripcion: string, item: any) =>
        item.st_descripcion.indexOf(st_descripcion) !== -1,
    },
    {
      title: 'Servidor',
      key: 'se_name',
      filtro_visible: false,
      listOfFilter: [],
      filterMultiple: true,
      fixed: 'left',
      filterFn: (JFROG: string, item: any) => item.JFROG.indexOf(JFROG) !== -1,
    },
    {
      title: 'Ambiente',
      key: 'en_env_descripcion',
      filtro_visible: false,
      listOfFilter: [
        { text: 'Dia a dia', value: 'dia2dia' },
        { text: 'Produccion', value: 'produccion' },
      ],
      filterMultiple: true,
      fixed: 'left',
      filterFn: (en_env_descripcion: string, item: any) =>
        item.en_env_descripcion.indexOf(en_env_descripcion) !== -1,
    },
    {
      title: 'Componente',
      key: 'cm_artifact_name',
      filtro_visible: false,
      listOfFilter: [],
      filterMultiple: true,
      fixed: 'left',
      filterFn: (Tipo: string, item: any) => item.Tipo.indexOf(Tipo) !== -1,
    },
    {
      title: 'Ejecutor',
      key: 'pt_executor',
      filtro_visible: false,
      listOfFilter: [],
      filterMultiple: false,
      fixed: 'left',
      filterFn: (Estado: string, item: any) =>
        item.Estado.indexOf(Estado) !== -1,
    },
    {
      title: 'Pipeline',
      key: 'pp_jenkins_jobname',
      filtro_visible: false,
      listOfFilter: [],
      filterMultiple: true,
      fixed: 'left',
      filterFn: (Estado: string, item: any) =>
        item.Estado.indexOf(Estado) !== -1,
    },
    {
      title: 'Fecha',
      key: 'ct_crq_deploy_date',
      filtro_visible: false,
      listOfFilter: [],
      filterMultiple: true,
      fixed: 'left',
      filterFn: (Estado: string, item: any) =>
        item.Estado.indexOf(Estado) !== -1,
    },
  ];

  childColumns = [
    { title: 'Justificacion Del Negocio', key: 'JustificacionDelNegocio' },
  ];

  constructor(private getChangeServices: GetChangesService) {}


validateButton(): void {
  const currentMode = this.modeSelect;
  const currentSearch = typeof this.elementSearch === 'string' ? this.elementSearch.trim() : '';

  // Si el valor previo y el actual son diferentes, se habilita el botón y se limpia el campo de búsqueda
  if (this.previousValue !== currentMode && this.previousValue != '') {
    this.btnStatus = true;
    this.elementSearch = '';
  }
  // Si son iguales o el previo no tiene valor, y el campo de búsqueda tiene contenido, se deshabilita el botón
  else if (this.previousValue == ''  || currentSearch) {
    this.btnStatus = false;
  }

  // Actualiza el valor previo para futuras comparaciones
  this.previousValue = currentMode;
}



  setFormatDate() {
    if (this.modeSelect == 'Fecha') {
      this.elementSearch = setDateFormatCRQTracking(this.elementSearch);
    }
  }

  reset() {
    this.elementSearch = '';
    this.validateButton();
  }

  onChange() {
    this.setFormatDate();

    if (this.modeSelect == 'REP') {
      this.getChangeServices.getCrqTracking(this.elementSearch).subscribe({
        next: (response) => {
          this.data = response;
        },
        error: (error) => {
          console.error('error:', error);
        },
      });
    }

    if (this.modeSelect == 'Componente') {
      this.getChangeServices.getComponent(this.elementSearch).subscribe({
        next: (response) => {
          this.data = response;
        },
        error: (error) => {
          console.error('error:', error);
        },
      });
    }

    if (this.modeSelect == 'Fecha') {
      this.getChangeServices.getCrqDate(this.elementSearch).subscribe({
        next: (response) => {
          this.data = response;
        },
        error: (error) => {
          console.error('error:', error);
        },
      });
    }
  }
}
