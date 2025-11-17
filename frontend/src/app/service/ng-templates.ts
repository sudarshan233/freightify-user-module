import { inject, Injectable } from '@angular/core';
import { Response } from '../models/user.types';

import { ConfirmationService, MessageService } from 'primeng/api';
import { Api } from './api';
import { UserService } from './user-service';

@Injectable({
  providedIn: 'root',
})
export class NgTemplates {
  confirmationService = inject(ConfirmationService)
  messageService = inject(MessageService)
  
  apiService = inject(Api)
  userService = inject(UserService)
  
  confirm(selectedUser: Response) {
        console.log("In ng service")
        this.confirmationService.confirm({
            header: 'Confirmation',
            message: 'Are you sure you want to delete this user\'s profile?',
            icon: 'pi pi-exclamation-circle',
            rejectButtonProps: {
                label: 'Cancel',
                icon: 'pi pi-times',
                variant: 'outlined',
                size: 'small'
            },
            acceptButtonProps: {
                label: 'Delete',
                icon: 'pi pi-check',
                size: 'small'
            },
            accept: () => {
                this.messageService.add(
                    { 
                        severity: 'info', 
                        summary: 'Confirmed', 
                        detail: 'User Deleted Successfully', 
                        life: 3000 
                    
                    });
                const selectedUserId = selectedUser.id;
                this.apiService.deleteUser(selectedUserId).subscribe((res: any) => {
                    this.userService.getUsers()
                });
            },
            reject: () => {
                this.messageService.add(
                    { 
                        severity: 'error',
                        summary: 'Rejected',
                        detail: 'User is not removed',
                        life: 3000 
                    });
            }
        });
    }

    show(message: string) {
        this.messageService.add({ 
          severity: 'info', 
          summary: 'Info', 
          detail: message, 
          life: 3000 
        });
    }
}
