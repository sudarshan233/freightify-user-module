import { Component, signal } from '@angular/core';
import { Header } from './components/header/header';
import { InputButtons } from './components/input-buttons/input-buttons';
import { Table } from './components/table/table';
import { UserModal } from './components/user-modal/user-modal';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [Header, InputButtons, Table, UserModal, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');

  showUserModal: boolean = false;
  selectedUserId: string = '';
  modalMode: 'view' | 'edit' | 'create' = 'create';


  toggleOnUserModal({ mode, userId}:{ mode: 'view' | 'edit' | 'create';
    userId?: string }) {
    this.modalMode = mode;
    this.showUserModal = true;
  }
  toggleOffUserModal() {
    this.showUserModal = false;
  }
}
