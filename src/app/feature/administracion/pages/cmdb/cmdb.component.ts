import { Component, OnInit } from '@angular/core';
import { filterData } from '../../../../shared/utils';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { ModalFormComponent } from '../../../../shared/components/modal-form/modal-form.component';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { editForm } from '../../../../core/interfaces/edit.interface';
import { environment } from '../../../../../environments/environment';
import { Column } from '../../../../core/interfaces/CRQcolumnsList.interface';
import { GetChangesService } from '../../../../core/services/get-changes.service';
import { StateService } from '../../../../core/services/state.service';
import { FrameworkModule } from '../../../../shared/framework.module';

@Component({
  selector: 'app-cmdb',
  imports: [TableComponent, ModalFormComponent, FormsModule, NzInputModule, FrameworkModule],
  templateUrl: './cmdb.component.html',
  styleUrl: './cmdb.component.scss'
})
export class CmdbComponent implements OnInit {
  muestraLoading:boolean = true;
  childColumns = [];
  data:any[] = []; //cambiar
  filter:string = '';
  filteredData: any[] = []; // Datos que se muestran en la tabla
  selectOption: number = 0;

  constructor(
    private getChangeServices: GetChangesService,
    private stateService: StateService
  ){}

  MapForm:any = {
    "cna_id": 'id',
    "cna_aplicacion": "value",
    "cat": 'cat',
    "cna_joya": 'joya'
  }

  columns: Column[] = [
    {
      title: 'Titulo',
      key: 'ca_tipo_alojamiento',
      filtro_visible: false,
      listOfFilter: [],
      filterMultiple: true,
      fixed: "left",
      filterFn: (Estado: string, item: any) => item.Estado.indexOf(Estado) !== -1
    }
  ];

  FormBase:any = {
    value: '',
    tabValue: ''
  }

  createForm:editForm = {
    url: environment.baseUrlApiCmdb+'/cmdb/add_catalog',
    action: 'addCatalog',
    description: 'Se agrega el registro de la cmdb',
    title: 'creo'
  }

  editForm:editForm = {
    url: environment.baseUrlApiCmdb+'/cmdb/edit_catalog',
    action: 'editCatalog',
    description: 'Se edito el registro de la cmdb',
    title: 'edito'
  }

  deleteForm:editForm = {
    url: environment.baseUrlApiCmdb+'/cmdb/delete_catalog',
    action: 'deleteCatalog',
    description: 'Se elimino el registro de la cmdb',
    title: 'elimino'
  }

  options: { title: string; id: number, key:string }[] = [
    { title: 'Alojamiento', id: 0, key: 'ca_tipo_alojamiento' },
    { title: 'Desarrollo', id: 1, key: 'cd_desarrollo' },
    { title: 'Entorno', id: 2, key: 'cec_tipo' },
    { title: 'Lenguaje', id: 3, key: 'cl_lenguaje' },
    { title: 'Aplicacion', id: 4, key: 'cna_aplicacion' },
    { title: 'Pais', id: 5, key: 'cps_servidor' },
    { title: 'Proveedor', id: 6, key: 'cp_proveedor' },
    { title: 'Responsable', id: 7, key: 'cra_mesa' },
    { title: 'Tipo Servidor', id: 8, key: 'cts_tipo_servidor'},
    { title: 'Esquema de Continuidad', id: 9, key: 'ce_esquema' },
    { title: 'Estrategia de Recuperacion de Infra', id: 10, key: 'cei_estrategias' },
    { title: 'Estrategia de Recuperacion de Datos', id: 11, key: 'ced_estrategias' },
    { title: 'Tiempo de Instalacion (Servidor)', id: 12, key: 'ctis_tiempo' },
    { title: 'Tiempo de instalacion (Aplicacion)', id: 13, key: 'ctia_tiempo' },
    { title: 'Joya de la Corona (Aplicacion)', id: 14, key: 'cj_joya' }
  ];


  getData(): void {
    this.getChangeServices.get_catalogo_cmdb().subscribe({
      next: (response) => {
        this.muestraLoading = false;

        const selectedOption = this.options[this.selectOption];
        if (selectedOption) {
          this.columns[0].key = selectedOption.key;
          this.columns[0].title = selectedOption.title;
        }

        // Asigna los datos y agrega la propiedad `cat`
        const rawData = response[this.selectOption] ?? [];
        this.data = rawData.map((item: any) => ({
          ...item,
          cat: this.options[this.selectOption].title
        }));
        this.filteredData = [...this.data];
      },
      error: (error) => {
        console.error("error", error);
      }
    });
  }


  ngOnInit(): void {
    this.stateService.refresh$.subscribe((shouldRefresh)=> {
      this.getData()
      if(shouldRefresh) {
        this.getData()
      }
    })
  }

  onSelectChange(): void {
    this.getData();
  }

  onFilterChange(value: any): void {
    this.filteredData = filterData(this.data, value, 'nombre');
  }
}
