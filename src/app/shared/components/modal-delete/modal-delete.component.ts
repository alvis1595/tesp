import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { editForm } from '../../../core/interfaces/edit.interface';
import { GetChangesService } from '../../../core/services/get-changes.service';
import { StateService } from '../../../core/services/state.service';

@Component({
  selector: 'app-modal-delete',
  imports: [ NzButtonModule,
    NzModalModule,
    NzIconModule,
    ReactiveFormsModule,
    FormsModule,
    NzInputModule,
    NzFormModule,
    CommonModule],
  templateUrl: './modal-delete.component.html',
  styleUrl: './modal-delete.component.scss'
})
export class ModalDeleteComponent {
  @Input() deletForm!:editForm ;
  @Input() form: any;
  isVisible = false;

  constructor(
    private getChange: GetChangesService,
    private stateService: StateService
    ) {}

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.getChange.edit_form(this.deletForm, this.form).subscribe(({
      next: (response) => {
        console.log('Se realizo la eliminacion correctamente');
        this.stateService.triggerRefresh({
          refresh: true,
          title: 'Se elimino el registro correctamente',
          descripcion: 'Se elimino el registro de la base de datos correctamente',
          type: 'success'
        });
      },
      error: (error) => {
        this.stateService.triggerRefresh({
          refresh: true,
          title: 'Error',
          descripcion: `Mensaje: ${error}`,
          type: 'error'
        });
      }
    }))
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
