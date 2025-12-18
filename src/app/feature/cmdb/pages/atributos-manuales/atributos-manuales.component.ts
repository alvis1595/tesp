import { GetChangesService } from './../../../../core/services/get-changes.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CMDB } from '../../../../core/interfaces/cmdb.interfaces';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { FormComponent } from './form/form.component';
import { CommonModule } from '@angular/common';
import { DeleteComponent } from './delete/delete.component';
import { StateService } from '../../../../core/services/state.service';
import { filterData } from '../../../../shared/utils';

@Component({
  selector: 'app-atributos-manuales',
  imports: [
    NzTableModule,
    NzInputModule,
    FormsModule,
    FormComponent,
    CommonModule,
    DeleteComponent,
  ],
  templateUrl: './atributos-manuales.component.html',
  styleUrl: './atributos-manuales.component.scss',
})
export class AtributosManualesComponent implements OnInit, OnDestroy {
  CMDB_data: CMDB[] = [];
  CMDB_filter: CMDB[] = [];
  muestraLoading:boolean = true;
  user: string = sessionStorage.getItem('fusuario') ?? '';
  roles: string = sessionStorage.getItem('froles') ?? '';
  filterValue: string = '';

  constructor(
    private getChange: GetChangesService
  ) {}

  ngOnInit(): void {
    this.user = this.user.replace(/"/g, ''); // Elimina todas las comillas dobles
    this.getData();
  }

  ngOnDestroy(): void {
    this.CMDB_data = [];
    this.filterValue = '';
  }

  getData(): void {
    this.getChange.getRegistrosCmdb().subscribe({
      next: (response) => {
        this.dataOrder(response);
        this.muestraLoading = false;
      },
      error: (error) => {
        console.error('error', error);
        this.muestraLoading = false;
      },
    });
  }

 onFilterChange(value: any): void {
    this.CMDB_filter = filterData(this.CMDB_data, value, 'nombre');
  }

  dataOrder(data: CMDB[]): void {
    const dataCopy = [...data];
    dataCopy.forEach((item, index) => {
      if (item.creador.includes(this.user)) {
        dataCopy.splice(index, 1);
        dataCopy.unshift(item);
      }
    });
    this.CMDB_filter = dataCopy;
    this.CMDB_data = dataCopy;
  }
}
