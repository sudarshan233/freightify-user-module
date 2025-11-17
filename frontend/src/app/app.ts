import {Component, inject, signal} from '@angular/core';
import { Header } from './components/header/header';
import { InputButtons } from './components/input-buttons/input-buttons';
import { Table } from './components/table/table';
import { UserModal } from './components/user-modal/user-modal';
import { CommonModule } from '@angular/common';
import {Response} from './models/user.types';
import {Api} from './service/api';
import { Filter } from './components/filter/filter';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageService, ConfirmationService } from 'primeng/api';
import { RouterOutlet } from '@angular/router';
import { ConfirmDialogTemplateDemo } from './components/confirm-dialog-template-demo/confirm-dialog-template-demo';

@Component({
  selector: 'app-root',
  imports: [Header, InputButtons, Table, UserModal, CommonModule,
    Filter, ToastModule, ConfirmDialogModule, RouterOutlet,
     ConfirmDialogTemplateDemo],
  templateUrl: './app.html',
  styleUrl: './app.css',
  providers: []
})
export class App {
  protected readonly title = signal('frontend');

  defaultUser = {
    userType: '',
    userRole: '',
    firstName: '',
    lastName: '',
    phoneNumber: 0,
    email: '',
    password: '',
    confirmPassword: '',
    userCurrency: '',
    numberFormat: '',
    measurementSystem: '',
    decimalPlaces: 0,
    userStatus: true,
    userTeam: [],
    createdAt: new Date(),
    updatedAt: new Date()
  };


  showUserModal: boolean = false;
  modalMode: 'view' | 'edit' | 'create' | 'delete' = 'create';
  selectedUser!: Response;

  users: Response[] = []

  apiService = inject(Api);

  toggleOnUserModal({ mode, user}:{ mode: 'view' | 'edit' | 'create',
    user: Response }) {
    this.modalMode = mode;
    this.selectedUser = user;
    console.log("From App: ", this.selectedUser);
    
    this.showUserModal = true;
  }
  toggleOffUserModal() {
    this.showUserModal = false;
  }
}
