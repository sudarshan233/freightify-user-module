import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { Ripple } from 'primeng/ripple';

@Component({
    selector: 'toast-basic-demo',
    templateUrl: './toast-basic-demo.html',
    standalone: true,
    imports: [Toast, Ripple, ButtonModule],
    providers: [MessageService]
})
export class ToastBasicDemo {}