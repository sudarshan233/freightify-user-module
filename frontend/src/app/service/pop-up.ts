import { Injectable } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class PopUp {
  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}
  
  showSuccessPopup(summary: string, detail: string) {
    this.messageService.add({
      severity: 'success',
      summary,
      detail
    })
  }

  showErrorPopup(summary: string, detail: string) {
    this.messageService.add({
      severity: 'error',
      summary,
      detail
    })
  }

  showConfirmationPopup(message: string, summary: string, detail: string) {
    this.confirmationService.confirm({
      message,
      header: 'Success',
      icon: 'pi pi-check-circle',
      acceptLabel: 'OK',
      rejectVisible: false,
      accept: () => {
        this.showSuccessPopup(summary, detail)
      }
    })
  }
}
