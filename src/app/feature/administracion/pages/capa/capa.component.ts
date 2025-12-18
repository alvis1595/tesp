import { editForm } from './../../../../core/interfaces/edit.interface';
import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { Column } from '../../../../core/interfaces/CRQcolumnsList.interface';
import { GetChangesService } from '../../../../core/services/get-changes.service';
import { Capa } from '../../../../core/interfaces/capa.interfaces';
import { environment } from '../../../../../environments/environment';
import { ModalFormComponent } from "../../../../shared/components/modal-form/modal-form.component";
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { filterData } from '../../../../shared/utils';
import { StateService } from '../../../../core/services/state.service';


@Component({
  selector: 'app-capa',
  imports: [TableComponent, ModalFormComponent, NzInputModule, FormsModule],
  templateUrl: './capa.component.html',
  styleUrl: './capa.component.scss'
})
export class CapaComponent implements OnInit {

  muestraLoading:boolean = true;
  childColumns = [];
  data:Capa[] = [];
  filter:string = '';
  filteredData: any[] = []; // Datos que se muestran en la tabla

  columns: Column[] = [
    {
      title: 'Capa',
      key: 'nombre',
      filtro_visible: false,
      listOfFilter: [],
      filterMultiple: true,
      fixed: "left",
      filterFn: (Estado: string, item: any) => item.Estado.indexOf(Estado) !== -1
    },
    {
      title: 'Descripcion',
      key: 'descripcion',
      filtro_visible: false,
      listOfFilter: [],
      filterMultiple: true,
      fixed: "left",
      filterFn: (Estado: string, item: any) => item.Estado.indexOf(Estado) !== -1
    }
  ];

  createForm:editForm = {
    url: environment.baseUrlApiPaseExpress+'/addcapa',
    action: 'addCapa',
    description: 'Se agrega la capa',
    title: 'creo'
  }

  editForm:editForm = {
    url: environment.baseUrlApiPaseExpress+'/editcapa',
    action: 'editCapa',
    description: 'Se edito la capa',
    title: 'edito'
  }

  deleteForm:editForm = {
    url: environment.baseUrlApiPaseExpress+'/delcapa',
    action: 'delCapa',
    description: 'Se elimino la capa',
    title: 'elimino'
  }

  constructor(
    private getChangeServices: GetChangesService,
    private stateService: StateService
  ){}

  FormBase:any = {
    nombre: '',
    descripcion: ''
  }

  onFilterChange(value: any): void {
    this.filteredData = filterData(this.data, value, 'nombre');
  }


  ngOnInit(): void {
    this.stateService.refresh$.subscribe((shouldRefresh)=> {
      this.getData()
      if(shouldRefresh) {
        this.getData()
      }
    })
  }

  getData():void {
    this.getChangeServices.get_capa().subscribe({
      next: (response) => {
        this.muestraLoading = false;
        this.data = response;
        this.filteredData = [...this.data];
      },
      error: (error) => {
        console.error("error", error);
      }
    })
  }

}
