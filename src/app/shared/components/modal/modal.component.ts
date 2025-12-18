import { Component, Input } from '@angular/core';
import { FrameworkModule } from '../../framework.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  imports: [FrameworkModule, CommonModule],
  standalone: true,
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {

  @Input() Title: string = "test";
  @Input() ButonTitle: string = "test";

  isVisible = false;
  isConfirmLoading = false;


  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 1000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
