import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LucideAngularModule, ArrowDownToLine, Plus } from 'lucide-angular';
import {Response, User} from '../../models/user.types';

@Component({
  selector: 'app-input-buttons',
  imports: [LucideAngularModule],
  templateUrl: './input-buttons.html',
  styleUrl: './input-buttons.css'
})
export class InputButtons {
  readonly ArrowDownToLine = ArrowDownToLine;
  readonly PlusIcon = Plus;

  @Output() toggleOnUserModal = new EventEmitter<{
    mode: 'create' | 'edit' | 'view',
    user: Response
  }>();

  onClickUserModal() {
    this.toggleOnUserModal.emit({
      mode: 'create',
      user: {
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
      }
    });
  }

}
