import { Component, inject, OnInit } from '@angular/core';
import { Column } from '../../../../core/interfaces/CRQcolumnsList.interface';
import { Catalogo } from '../../../../core/interfaces/catalogo.interfaces';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { editForm } from '../../../../core/interfaces/edit.interface';
import { environment } from '../../../../../environments/environment';
import { GetChangesService } from '../../../../core/services/get-changes.service';
import { ModalFormComponent } from "../../../../shared/components/modal-form/modal-form.component";
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { filterData } from '../../../../shared/utils';
import { StateService } from '../../../../core/services/state.service';
import { FrameworkModule } from '../../../../shared/framework.module';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ModalInterface } from '../../../../core/interfaces/modal.interfaces';


@Component({
  selector: 'app-catalogo',
  imports: [TableComponent, ReactiveFormsModule, ModalFormComponent, NzInputModule, FormsModule, FrameworkModule, ],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.scss'
})
export class CatalogoComponent implements OnInit{
  muestraLoading:boolean = true;
  childColumns = [];
  data:Catalogo[] = [];
  filter:string = '';
  filteredData: any[] = []; // Datos que se muestran en la tabla

  //data modal
  modal:Catalogo = {
    ape_id: "",
    aplicacion: "",
    equipo_resp_desa: "",
    equipo_resp_infra: "",
  };

  select:Catalogo[] = []

  columns: Column[] = [
    {
      title: 'Servicio',
      key: 'aplicacion',
      filtro_visible: false,
      listOfFilter: [],
      filterMultiple: true,
      fixed: "left",
      filterFn: (Estado: string, item: any) => item.Estado.indexOf(Estado) !== -1
    },
    {
      title: 'Mesa Resp. Desa',
      key: 'equipo_resp_desa',
      filtro_visible: false,
      listOfFilter: [],
      filterMultiple: true,
      fixed: "left",
      filterFn: (Estado: string, item: any) => item.Estado.indexOf(Estado) !== -1
    },
    {
      title: 'Mesa Resp Infra',
      key: 'equipo_resp_infra',
      filtro_visible: false,
      listOfFilter: [],
      filterMultiple: true,
      fixed: "left",
      filterFn: (Estado: string, item: any) => item.Estado.indexOf(Estado) !== -1
    }
  ];

  editForm:editForm = {
    url: environment.baseUrlApiPaseExpress+'/editservice',
    action: 'editAplic',
    description: 'Se edito el servicio del catalogo',
    title: 'edito'
  }

  createForm:editForm = {
    url: environment.baseUrlApiPaseExpress+'/addservice',
    action: 'addAplic',
    description: 'Se agrega el servicio del catalogo',
    title: 'creo'
  }

  FormBase:any = {
    apeid: '',
    aplicacion: '',
    equipo_resp_desa: '',
    equipo_resp_infra: ''
  }

  deleteForm:editForm = {
    url: environment.baseUrlApiPaseExpress+'/delservice',
    action: 'addAplic',
    description: 'Se elimino el servicio del catalogo',
    title: 'elimino'
  }

  constructor(
    private getChangeServices: GetChangesService,
    private stateService: StateService
  ){}

    onFilterChange(value: any): void {
      this.filteredData = filterData(this.data, value, 'aplicacion');
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
      this.getChangeServices.get_catalogo().subscribe({
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


  setIndexModal(index: any): void {
    this.modal = index;
    const ape_id: string = this.modal.ape_id;

    this.getChangeServices.get_detalle_catalogo(ape_id).subscribe({
      next: (response) => {
        this.select = response;
        this.initForm();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  initForm(): void {
    this.validateForm = this.fb.group({
      Servicio: this.fb.control(this.modal.aplicacion, [Validators.required]),
      Mesa_Resp_Desa: this.fb.control(this.modal.equipo_resp_desa, [Validators.required]),
      Mesa_Resp_Infra: this.fb.control(this.modal.equipo_resp_infra, [Validators.required]),
      Capa: this.fb.control('', [Validators.required]), // Aquí se guarda el cc_id
      Activo: this.fb.control('', [Validators.required]),
      Estado: this.fb.control('', [Validators.required]),
      Pase: this.fb.control('', [Validators.required]),
    });

    //Cambiar Capa
    this.validateForm.get('Capa')?.valueChanges.subscribe((selectedCcId) => {
      const ccIdNumber = Number(selectedCcId); // conversión explícita
      const capaSeleccionada = this.select.find(item => item.cc_id === ccIdNumber);
      if (capaSeleccionada) {
        this.validateForm.patchValue({
          Activo: capaSeleccionada.activo ?? '',
          Estado: capaSeleccionada.estadodc ?? '',
          Pase: capaSeleccionada.requiere_pase_comp ?? ''
        });
      }
    });

  }

  private fb = inject(NonNullableFormBuilder);

  validateForm = this.fb.group({
    Servicio: this.fb.control('', [Validators.required]),
    Mesa_Resp_Desa: this.fb.control('', [Validators.required]),
    Mesa_Resp_Infra: this.fb.control('', [Validators.required]),
    Capa: this.fb.control('', [Validators.required]),
    Activo: this.fb.control('', [Validators.required]),
    Estado: this.fb.control('', [Validators.required]),
    Pase: this.fb.control('', [Validators.required]),
  });

  submitForm(): void {
    if (this.validateForm.valid) {
      const ape_id: string = this.modal.ape_id;
      const {
        Activo,
        Capa,
        Estado,
        Pase,
      } = this.validateForm.value;

      // Validación adicional por seguridad (opcional)
      if (!Capa || !Activo || !Estado || !Pase) {
        console.error('Faltan campos requeridos para enviar la solicitud.');
        return;
      }

      this.getChangeServices.postEstados(ape_id, Capa, Activo, Estado, Pase).subscribe({
        next: (response) => {
          this.notificar({
            refresh: true,
            title: 'Se creo el registro correctamente',
            descripcion: 'Se realizo el registro correctamente en la base de datos',
            type: 'success'
          });
        },
        error: (error) => {
          console.log(error);
          console.error('Error al enviar los datos:', error);
        }
      });
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsTouched();
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  notificar(payload:ModalInterface) {
    this.stateService.triggerRefresh(payload);
  }
}
