import { editForm } from './../../../core/interfaces/edit.interface';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CommonModule } from '@angular/common';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { GetChangesService } from '../../../core/services/get-changes.service';
import { StateService } from '../../../core/services/state.service';

@Component({
  selector: 'app-modal-form',
  imports: [
    NzButtonModule,
    NzModalModule,
    NzIconModule,
    ReactiveFormsModule,
    FormsModule,
    NzInputModule,
    NzFormModule,
    CommonModule],
  templateUrl: './modal-form.component.html',
  styleUrl: './modal-form.component.scss'
})
export class ModalFormComponent implements OnChanges {
@Input() form: any;
@Input() title: string = '';
@Input() type: string = 'edit';
@Input() editForm!: editForm;
@Input() mapForm:any = {}
@Input() extraVars?: any;

isVisible = false;
formEdit!: FormGroup;
formInit!: any;

// Campos que no se deben mostrar en el formulario
private hiddenKeys: string[] = ['cc_id', 'id', 'ca_id'];

constructor(
  private getChange: GetChangesService,
  private stateService: StateService
) {}

ngOnChanges(changes: SimpleChanges): void {
  if (changes['form'] && this.form) {
    this.buildForm();
  }
}

buildForm(): void {
  const group: any = {};
  for (const key in this.form) {
    group[key] = new FormControl(this.form[key]);
  }
  this.formEdit = new FormGroup(group);
  this.formInit = this.formEdit.value;
}

showModal(): void {
  this.isVisible = true;
  this.buildForm(); // Asegura que el formulario se actualice al abrir el modal
}

handleOk(): void {
  this.onSubmit();
  this.isVisible = false;
}

handleCancel(): void {
  this.isVisible = false;
}

onSubmit(): void {
  const value = this.formEdit.value;
  const mappedValues = this.mapFormValues(value, this.mapForm);

  this.getChange.edit_form(this.editForm, mappedValues, this.formInit).subscribe({
    next: () => {
      console.log(`Se realizó el ${this.editForm.title} correctamente`);
      this.stateService.triggerRefresh({
        refresh: true,
        title: `Se ${this.editForm.title} el registro correctamente`,
        descripcion: `Se ${this.editForm.title} el registro de la base de datos correctamente`,
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
  });
}

// Llaves visibles en el formulario
get formKeys(): string[] {
  return Object.keys(this.formEdit.controls).filter(
    key => !this.hiddenKeys.includes(key)
  );
}

ngOnDestroy(): void {
  this.form = '';
}

private mapFormValues(formValues: any, mapForm: { [key: string]: string }): any {
  const result: any = {};
  for (const key in formValues) {
    if (mapForm.hasOwnProperty(key)) {
      result[mapForm[key]] = formValues[key];
    } else {
      result[key] = formValues[key]; // opcional: conservar claves no mapeadas
    }
  }
  return result;
}

}
