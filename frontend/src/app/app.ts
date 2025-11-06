import { Component, signal } from '@angular/core';
import { Header } from './components/header/header';
import { InputButtons } from './components/input-buttons/input-buttons';
import { Table } from './components/table/table';
import { UserModal } from './components/user-modal/user-modal';
import { CommonModule } from '@angular/common';
import {Response} from './models/user.types';

@Component({
  selector: 'app-root',
  imports: [Header, InputButtons, Table, UserModal, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');

  defaultUser: Response = {
    id: '',
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
  modalMode: 'view' | 'edit' | 'create' = 'create';
  selectedUser!: Response;

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
