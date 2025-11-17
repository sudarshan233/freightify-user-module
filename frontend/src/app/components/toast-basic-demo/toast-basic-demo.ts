import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
@Component({
    selector: 'toast-basic-demo',
    templateUrl: './toast-basic-demo.html',
    standalone: true,
    imports: [Toast, ButtonModule],
    providers: [MessageService]
})
export class ToastBasicDemo {}