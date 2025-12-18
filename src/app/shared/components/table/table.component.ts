import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { FrameworkModule } from '../../framework.module';
import { CommonModule, formatDate } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { Column } from '../../../core/interfaces/CRQcolumnsList.interface';
import { ModalFormComponent } from '../modal-form/modal-form.component';
import { editForm } from '../../../core/interfaces/edit.interface';
import { ModalDeleteComponent } from "../modal-delete/modal-delete.component";
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { StateService } from '../../../core/services/state.service';
import { Subscription } from 'rxjs';
import { ModalInterface } from '../../../core/interfaces/modal.interfaces';

@Component({
  selector: 'app-table',
  imports: [FrameworkModule, CommonModule, ModalFormComponent, ModalDeleteComponent],
  standalone: true,
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit, OnDestroy{
    @ViewChild('headerTemplate', { static: true }) headerTemplate: TemplateRef<any> | undefined;
    @ViewChild('bodyTemplate', { static: true }) bodyTemplate: TemplateRef<any> | undefined;
    @Input() columns: Array<Column> = [];
    @Input() data: Array<any> = [];
    @Input() childColumns: Array<{ title: string, key: string, fixed?: 'left' | 'right' }> = [];
    @Input() hasExpandColumn: boolean = false;
    @Input() hasEditColumn: boolean = false;
    @Input() MapForm: any = {};
    @Input() loading!: boolean;
    @Input() mTitle!: string;
    @Input() iconBtn: string = 'info';

    @Input() FormEdit: editForm = {
      url: '',
      action: '',
      description: ''
    };

    @Input() deleteForm: editForm = {
      url: '',
      action: '',
      description: ''
    };

    @Output() indexModal = new EventEmitter<number>();
    private subscription!: Subscription;

    listOfDisplayData: Array<any> = [];
    displayData: Array<any> = [];
    pageIndex: number = 1;
    nzPageSize: number = 10;
    searchValue = '';


    //Modal table
    isVisible:boolean = false;
    isConfirmLoading:boolean = false;

    constructor(
      private domSanitizer: DomSanitizer,
      private stateService: StateService,
      private notification: NzNotificationService) {}

    ngOnDestroy() {
      this.subscription?.unsubscribe();

    }

    ngOnInit() {
      this.subscription = this.stateService.refresh$.subscribe(payload => {
        if (payload.refresh) {
          this.showNotification(payload);
          this.stateService.clearRefresh();
        }
      });
    }


    ngOnChanges(changes: SimpleChanges): void {
      if (changes['data']) {
        this.listOfDisplayData = [...this.data];
        this.updateDisplayData();
      }
    }


    isHtml(content: string): boolean {
      const div = document.createElement('div');
      div.innerHTML = content;
      return div.childNodes.length > 0 && div.childNodes[0].nodeType === 1;
    }

    escapeHtml(unsafe: string): string {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    getCellClass(value: any): string {
      if (value === 'someValue') {
        return 'red-cell';
      } else if (value === 'DONE') {
        return 'green-cell';
      } else if (value === 'yetAnotherValue') {
        return 'blue-cell';
      }
      return '';
    }

    onPageChange(pageIndex: number): void {
      this.pageIndex = pageIndex;
      this.updateDisplayData();
    }

    updateDisplayData(): void {
      const startIndex = (this.pageIndex - 1) * this.nzPageSize;
      const endIndex = startIndex + this.nzPageSize;
      this.displayData = this.listOfDisplayData.slice(startIndex, endIndex);
    }

    reset(): void {
      this.searchValue = '';
      this.listOfDisplayData = [...this.data];
      this.updateDisplayData();
    }

    search(columnKey: string): void {
      this.listOfDisplayData = this.data.filter((item: any) => item[columnKey] && item[columnKey].includes(this.searchValue));
      this.updateDisplayData();
    }

    getGlobalIndex(i: number): number {
      const number = (this.pageIndex - 1) * this.nzPageSize + i;
      return number;
    }

    showModal(row: any): void {
      this.indexModal.emit(row);
      this.isVisible = true;
    }


    handleOk(): void {
      this.isConfirmLoading = true;
      setTimeout(() => {
        this.isVisible = false;
        this.isConfirmLoading = false;
      }, 1000);
    }

    showNotification(payload: ModalInterface): void {
      this.isVisible = false;
      this.notification.create(
        payload.type ?? 'info',
        payload.title ?? '',
        payload.descripcion ?? ''
      )
    }

    handleCancel(): void {
      this.isVisible = false;
    }
}
