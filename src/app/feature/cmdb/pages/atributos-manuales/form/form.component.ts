import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzFormModule } from 'ng-zorro-antd/form';
import { CMDB, CMDBFORM } from '../../../../../core/interfaces/cmdb.interfaces';
import { GetChangesService } from '../../../../../core/services/get-changes.service';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';

import {
  FormGroup,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-form',
  imports: [
    NzButtonModule,
    NzModalModule,
    NzInputModule,
    NzSelectModule,
    NzFormModule,
    CommonModule,
    ReactiveFormsModule,
    NzIconModule,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent implements OnInit {
  isVisible: boolean = false;
  catalogos!: CMDBFORM;
  formGroup!: FormGroup;
  user: string = sessionStorage.getItem('fusuario') ?? '';
  joya: string = '';
  title: string = '';

  @Input() type: string = 'Crear';
  @Input() data!: CMDB;

  @Output() refrescarDatos = new EventEmitter<void>();

  constructor(
    private getChangeService: GetChangesService,
    private fb: FormBuilder,
    private modal: NzModalService
  ) {}

  ngOnInit(): void {
    const repValidators =
    this.type === 'Crear'
      ? [Validators.required, Validators.pattern('^(REP-\\d{3,}|CRQ\\d{3,})$')]
      : [Validators.required];

    this.formGroup = this.fb.group({
      servidor: ['', Validators.required],
      ip: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9]).){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])$'
          ),
        ],
      ],
      servidorPropio: ['', Validators.required],
      entornoCi: ['', Validators.required],
      pais_Subsidiaria: ['', Validators.required],
      nombreAplicacion: ['', Validators.required],
      lenguaje: ['', Validators.required],
      proveedor: ['', Validators.required],
      desarrollo: ['', Validators.required],
      mesaResponsable: ['', Validators.required],
      rep: ['', repValidators],
      alojamiento: ['', Validators.required],
      esquemaContinuidad: [''],
      estrategiaRecuperacionInfra: [''],
      estrategiaRecuperacionDatos: [''],
      tiempoInstalacionServidor: [''],
      tiempoInstalacionAplicacion: [''],
      joyaCorona: [{ value: '', disabled: true }],
    });
  }

  showModal(): void {
    this.getData();
    this.createTitle();
    this.isVisible = true;
  }

  refrescar(): void {
    this.refrescarDatos.emit();
  }

  createTitle(): string {
    if (this.type == 'Crear') {
      this.title = 'Agregar Nuevo Servidor';
    } else if (this.type == 'editar') {
      this.title = 'Editar Servidor';
    }
    return this.title;
  }

  handleOk(): void {
    this.isVisible = false;
  }

  getJoya(event: any): void {
    if (event) {
      this.getChangeService.getJoya(event).subscribe({
        next: (response) => {
          this.formGroup.patchValue({ joyaCorona: response[0].cna_joya });
          this.joya = response[0].cna_joya;
        },
      });
    }
  }

  handleCancel(): void {
    this.isVisible = false;
    this.resetForm();
  }

  patchDataEdit(): void {
    this.formGroup.patchValue({
      alojamiento: this.data.alojamiento,
      nombreAplicacion: this.data.aplicacion,
      cr_id: this.data.cr_id,
      creador: this.data.creador,
      desarrollo: this.data.desarrollo,
      entornoCi: this.data.entorno_ci,
      esquemaContinuidad: this.data.esquema_de_continuidad,
      estrategiaRecuperacionDatos: this.data.estrategias_de_recuperacion_datos,
      estrategiaRecuperacionInfra: this.data.estrategias_de_recuperacion_infra,
      fecha: this.data.fecha,
      servidorPropio: this.data.tipo_servidor,
      ip: this.data.ip,
      joyaCorona: this.data.joya_de_la_corona,
      lenguaje: this.data.lenguaje,
      pais_Subsidiaria: this.data.pais,
      proveedor: this.data.proveedor,
      rep: this.data.rep,
      mesaResponsable: this.data.responsable,
      servidor: this.data.servidor,
      tiempoInstalacionAplicacion: this.data.tiempo_de_instalacion_aplicacion,
      tiempoInstalacionServidor: this.data.tiempo_de_instalacion_servidor,
    });
  }

  getData(): void {
    if (this.data && this.type == 'editar') {
      this.patchDataEdit();
    }
    this.getChangeService.getCatalogos().subscribe({
      next: (response) => {
        this.catalogos = response;
      },
      error: (error) => {},
    });
  }

  onSubmit(): void {
    const {
      alojamiento,
      nombreAplicacion,
      servidor,
      desarrollo,
      proveedor,
      rep,
      ip,
      servidorPropio,
      tiempoInstalacionAplicacion,
      mesaResponsable,
      pais_Subsidiaria,
      entornoCi,
      lenguaje,
      esquemaContinuidad,
      estrategiaRecuperacionDatos,
      estrategiaRecuperacionInfra,
      tiempoInstalacionServidor,
    } = this.formGroup.value;


    let  joyaCorona = ''
    console.log(joyaCorona);

    let cr_id = 0;
    if (this.type == 'editar'){
      joyaCorona = this.formGroup.value.joyaCorona ?? this.data.joya_de_la_corona
      cr_id = this.data.cr_id;
    }else{
      joyaCorona = this.joya;
    }


    const newRecord: CMDB = {
      alojamiento: alojamiento,
      aplicacion: nombreAplicacion,
      creador: this.user, //agregar
      desarrollo: desarrollo,
      cr_id ,
      entorno_ci: entornoCi,
      esquema_de_continuidad: esquemaContinuidad,
      estrategias_de_recuperacion_datos: estrategiaRecuperacionDatos,
      estrategias_de_recuperacion_infra: estrategiaRecuperacionInfra,
      fecha: '',
      ip: ip,
      joya_de_la_corona: joyaCorona,
      lenguaje: lenguaje,
      pais: pais_Subsidiaria,
      proveedor: proveedor,
      rep: rep,
      responsable: mesaResponsable,
      servidor: servidor,
      tiempo_de_instalacion_aplicacion: tiempoInstalacionAplicacion,
      tiempo_de_instalacion_servidor: tiempoInstalacionServidor,
      tipo_servidor: servidorPropio,
      upwd: sessionStorage.getItem('fpassword') ?? ''
    };

    if (this.type == 'Crear') {
      this.getChangeService.createRecord(newRecord).subscribe({
        next: (response) => {
          console.log('Respuesta de exito', response);
          this.refrescar();
          this.handleOk();
        },
        error: (error) => {
          console.log(error);
        },
      });
    } else if (this.type == 'editar') {
      this.getChangeService.editRecord(newRecord).subscribe({
        next: (response) => {
          console.log('Respuesta de exito', response);
          // this.handleOk();
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }

  editOrSubmit(): void {
    if (this.type == 'editar') {
      this.showConfirm();
    } else {
      this.onSubmit();
    }
  }

  showConfirm(): void {
    this.modal.confirm({
      nzTitle: '<i>¿Estás seguro de que deseas editar este servidor?</i>',
      nzContent: '<b>Por favor, revisa los cambios antes de confirmar.</b>',
      nzOnOk: () => this.onSubmit(),
      nzCentered: true, // Asegúrate de que nzCentered esté correctamente definido
    });
  }

  resetForm(): void {
    this.formGroup.reset();
  }
}
