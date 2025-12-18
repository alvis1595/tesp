import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalService } from 'ng-zorro-antd/modal';
import { GetChangesService } from '../../../../../core/services/get-changes.service';
import {
  CMDB,
  CMDBDelete,
} from '../../../../../core/interfaces/cmdb.interfaces';

@Component({
  selector: 'app-delete',
  imports: [NzButtonModule, NzIconModule],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.scss',
})
export class DeleteComponent {
  @Input() data!: CMDB;
  @Output() refrescarDatos = new EventEmitter<void>();


  constructor(
    private modal: NzModalService,
    private getChangeService: GetChangesService
  ) {}

  showDeleteConfirm(): void {
    this.modal.confirm({
      nzTitle: `¿Estás seguro de que deseas borrar este servidor ${this.data.servidor}?`,
      nzContent:
        '<b style="color: red;">Por favor, ten en cuenta que esta acción es irreversible.</b>',
      nzOkText: 'Sí',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.submitRequest(),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancelado'),
    });
  }

  refrescar(): void {
    this.refrescarDatos.emit();
  }

  submitRequest(): void {
    const deleteRecord: CMDBDelete = {
      cr_id: this.data.cr_id,
      creador: sessionStorage.getItem('fusuario') ?? '',
      upwd: sessionStorage.getItem('fpassword') ?? ''
    };
    this.getChangeService.deleteRecord(deleteRecord).subscribe({
      next: (response) => {
        this.refrescar();
        console.log('El reporte se eliminó exitosamente.');
      },
      error: (error) => {
        console.error('Hubo un error al eliminar el reporte', error);
      },
    });
  }
}
