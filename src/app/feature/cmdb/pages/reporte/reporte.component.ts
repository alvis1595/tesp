import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GetChangesService } from '../../../../core/services/get-changes.service';
import { ExcelReportService } from '../../../../shared/services/excel-report.service';
import { Subject } from 'rxjs';
import { Column } from '../../../../core/interfaces/CRQcolumnsList.interface';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { filterData } from '../../../../shared/utils';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-reporte',
  imports: [FormsModule, TableComponent, NzInputModule, CommonModule,NzButtonModule],
  templateUrl: './reporte.component.html',
  styleUrl: './reporte.component.scss',
})
export class ReporteComponent implements OnInit {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  muestraLoading: boolean = true;
  childColumns: any[] = [];
  filterValue: any[] = [];
  data: any = [];
  data_filter:any = [];
  columns: Column[] = [
    {
      title: 'Nombre de servidor',
      key: 'nombre_servidor',
      filtro_visible: false,
      listOfFilter: [],
      filterMultiple: true,
      fixed: 'left',
      filterFn: (Alojamiento: string, item: any) =>
        item.Alojamiento.indexOf(Alojamiento) !== -1,
    },
    {
      title: 'ip',
      key: 'ip',
      filtro_visible: false,
      listOfFilter: [],
      filterMultiple: true,
      fixed: 'left',
      filterFn: (Alojamiento: string, item: any) =>
        item.Alojamiento.indexOf(Alojamiento) !== -1,
    },
    {
      title: 'marca',
      key: 'marca',
      filtro_visible: false,
      listOfFilter: [],
      filterMultiple: true,
      fixed: 'left',
      filterFn: (Alojamiento: string, item: any) =>
        item.Alojamiento.indexOf(Alojamiento) !== -1,
    },
    {
      title: 'modelo',
      key: 'modelo',
      filtro_visible: false,
      listOfFilter: [],
      filterMultiple: true,
      fixed: 'left',
      filterFn: (Alojamiento: string, item: any) =>
        item.Alojamiento.indexOf(Alojamiento) !== -1,
    },
    {
      title: 'Sistema Operativo',
      key: 'so',
      filtro_visible: false,
      listOfFilter: [],
      filterMultiple: true,
      fixed: 'left',
      filterFn: (Alojamiento: string, item: any) =>
        item.Alojamiento.indexOf(Alojamiento) !== -1,
    },
    {
      title: 'version de so',
      key: 'version_so',
      filtro_visible: false,
      listOfFilter: [],
      filterMultiple: true,
      fixed: 'left',
      filterFn: (Alojamiento: string, item: any) =>
        item.Alojamiento.indexOf(Alojamiento) !== -1,
    },
    {
      title: 'pais',
      key: 'pais',
      filtro_visible: false,
      listOfFilter: [],
      filterMultiple: true,
      fixed: 'left',
      filterFn: (Alojamiento: string, item: any) =>
        item.Alojamiento.indexOf(Alojamiento) !== -1,
    },
    {
      title: 'serie',
      key: 'serie',
      filtro_visible: false,
      listOfFilter: [],
      filterMultiple: true,
      fixed: 'left',
      filterFn: (Alojamiento: string, item: any) =>
        item.Alojamiento.indexOf(Alojamiento) !== -1,
    },
    {
      title: 'entorno',
      key: 'entorno',
      filtro_visible: false,
      listOfFilter: [],
      filterMultiple: true,
      fixed: 'left',
      filterFn: (Alojamiento: string, item: any) =>
        item.Alojamiento.indexOf(Alojamiento) !== -1,
    },
    {
      title: 'aplicacion',
      key: 'aplicacion',
      filtro_visible: false,
      listOfFilter: [],
      filterMultiple: true,
      fixed: 'left',
      filterFn: (Alojamiento: string, item: any) =>
        item.Alojamiento.indexOf(Alojamiento) !== -1,
    },
    {
      title: 'responsable',
      key: 'responsable',
      filtro_visible: false,
      listOfFilter: [],
      filterMultiple: true,
      fixed: 'left',
      filterFn: (Alojamiento: string, item: any) =>
        item.Alojamiento.indexOf(Alojamiento) !== -1,
    },
    {
      title: 'proveedor',
      key: 'proveedor',
      filtro_visible: false,
      listOfFilter: [],
      filterMultiple: true,
      fixed: 'left',
      filterFn: (Alojamiento: string, item: any) =>
        item.Alojamiento.indexOf(Alojamiento) !== -1,
    },
    {
      title: 'Base de datos',
      key: 'base_datos',
      filtro_visible: false,
      listOfFilter: [],
      filterMultiple: true,
      fixed: 'left',
      filterFn: (Alojamiento: string, item: any) =>
        item.Alojamiento.indexOf(Alojamiento) !== -1,
    },
    {
      title: 'Version de BD',
      key: 'version_bd',
      filtro_visible: false,
      listOfFilter: [],
      filterMultiple: true,
      fixed: 'left',
      filterFn: (Alojamiento: string, item: any) =>
        item.Alojamiento.indexOf(Alojamiento) !== -1,
    },
    {
      title: 'Memoria',
      key: 'memoria',
      filtro_visible: false,
      listOfFilter: [],
      filterMultiple: true,
      fixed: 'left',
      filterFn: (Alojamiento: string, item: any) =>
        item.Alojamiento.indexOf(Alojamiento) !== -1,
    },
    {
      title: 'Disco',
      key: 'disco',
      filtro_visible: false,
      listOfFilter: [],
      filterMultiple: true,
      fixed: 'left',
      filterFn: (Alojamiento: string, item: any) =>
        item.Alojamiento.indexOf(Alojamiento) !== -1,
    },
    {
      title: 'CPU',
      key: 'cpu',
      filtro_visible: false,
      listOfFilter: [],
      filterMultiple: true,
      fixed: 'left',
      filterFn: (Alojamiento: string, item: any) =>
        item.Alojamiento.indexOf(Alojamiento) !== -1,
    },
    {
      title: 'Modelo de CPU',
      key: 'model_cpu',
      filtro_visible: false,
      listOfFilter: [],
      filterMultiple: true,
      fixed: 'left',
      filterFn: (Alojamiento: string, item: any) =>
        item.Alojamiento.indexOf(Alojamiento) !== -1,
    },
    {
      title: 'Nucleos logicos',
      key: 'nucleos_logicos',
      filtro_visible: false,
      listOfFilter: [],
      filterMultiple: true,
      fixed: 'left',
      filterFn: (Alojamiento: string, item: any) =>
        item.Alojamiento.indexOf(Alojamiento) !== -1,
    },
    {
      title: 'Cores',
      key: 'nucleos_core',
      filtro_visible: false,
      listOfFilter: [],
      filterMultiple: true,
      fixed: 'left',
      filterFn: (Alojamiento: string, item: any) =>
        item.Alojamiento.indexOf(Alojamiento) !== -1,
    },
    {
      title: 'Alojamiento',
      key: 'alojamiento',
      filtro_visible: false,
      listOfFilter: [],
      filterMultiple: true,
      fixed: 'left',
      filterFn: (Alojamiento: string, item: any) =>
        item.Alojamiento.indexOf(Alojamiento) !== -1,
    },
  ];

  constructor(
    private getChangeServices: GetChangesService,
    private excelService: ExcelReportService
  ) {}

  getData(): void {
    this.getChangeServices.get_cmdb_report().subscribe({
      next:(response)=>{
        this.muestraLoading = false;
        this.data_filter = response;
        this.data = response;
      },error:(error)=>{
        console.log(error);
      }
    })
  }

  ngOnInit(): void {
    this.getData();
  }

 onFilterChange(value: any): void {
    this.data_filter = filterData(this.data, value, 'nombre');
  }

  downloadExcel(data: any): void {
    const Excel = this.filterObjectKeys(data);
    this.excelService.generateDefaultReport(Excel, 'Reporte_CMDB.xlsx');
  }

  filterObjectKeys(data:any): any[] {
    const keysToKeep = [
      "nombre_servidor", "ip", "virtual", "marca", "modelo", "so", "version_so",
      "pais", "serie", "entorno", "aplicacion", "responsable", "proveedor",
      "base_datos", "version_bd", "memoria", "disco", "cpu", "model_cpu",
      "nucleos_logicos", "nucleos_core", "alojamiento", "fecha"
    ];

    return data.map((obj:any) => {
      const filtered: any = {};
      for (const key of keysToKeep) {
        if (key in obj) {
          (filtered as any)[key] = obj[key];
        } else if (key === "virtual") {
          (filtered as any)[key] = "no disponible";
        }
      }
      return filtered;
    });
  }
}
