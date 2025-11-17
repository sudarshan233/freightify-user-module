import { Component, inject, Input } from '@angular/core';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';


@Component({
    selector: 'confirm-dialog-template-demo',
    templateUrl: './confirm-dialog-template-demo.html',
    standalone: true,
    imports: [ConfirmDialog, ToastModule, ButtonModule, CommonModule],
})
export class ConfirmDialogTemplateDemo {
}