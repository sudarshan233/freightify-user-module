import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { Dropdown } from '../dropdown/dropdown';
import { TypingInput } from '../typing-input/typing-input';
import { PasswordCriteria } from '../password-criteria/password-criteria';
import { PasswordStrengthBar } from '../password-strength-bar/password-strength-bar';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X } from 'lucide-angular';
import { Api } from '../../service/api';
import {Response} from '../../models/user.types';
import {users} from '../../models/user.data';

@Component({
  selector: 'app-user-modal',
  imports: [Dropdown, TypingInput, PasswordCriteria, PasswordStrengthBar,
    CommonModule, LucideAngularModule, FormsModule
  ],
  templateUrl: './user-modal.html',
  styleUrl: './user-modal.css'
})
export class UserModal implements OnChanges {
  readonly X = X;

  apiService = inject(Api);
  private cdr = inject(ChangeDetectorRef);

  @Input() mode!: 'create' | 'edit' | 'view'
  @Input() selectedUser!: Response;
  @Output() toggleOffUserModal = new EventEmitter<boolean>();

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedUser']  && this.selectedUser && this.mode === 'edit') {
      console.log('Modal received user:', this.selectedUser);
      this.patchUserData()
    }
    else if (changes['selectedUser']  && this.selectedUser && this.mode === 'view') {
      console.log('Modal received user:', this.selectedUser);
      this.patchUserData()
    }
  }

  private patchUserData() {
    this.selectedUserId = this.selectedUser.id;
    this.selectedUserType = this.selectedUser.userType;
    this.selectedUserRole = this.selectedUser.userRole;
    this.firstName = this.selectedUser.firstName;
    this.lastName = this.selectedUser.lastName;
    this.phoneNumber = this.selectedUser.phoneNumber.toString();
    this.email = this.selectedUser.email;
    this.password = ''
    this.confirmPassword = ''
    this.selectedUserCurrency = this.selectedUser.userCurrency;
    this.selectedNumberFormat = this.selectedUser.numberFormat;
    this.selectedMeasurementSystem = this.selectedUser.measurementSystem;
    this.selectedDecimalPlace = this.selectedUser.decimalPlaces.toString();
    this.selectedUserStatus = this.selectedUser.userStatus;

    this.userTeams.forEach(team => (team.checked = false));

    if (this.selectedUser.userTeam && Array.isArray(this.selectedUser.userTeam)) {
      this.selectedUser.userTeam.forEach(userTeamValue => {
        const match = this.userTeams.find(t => t.value === userTeamValue);
        if (match) match.checked = true;
      });
    }

    console.log('Incoming Teams:', this.selectedUser.userTeam);
    console.log('Updated Teams:', this.userTeams);
    this.cdr.detectChanges();

  }

  selectedUserId!: string;

  userTypes: string[] = ["Internal User", "Customer"]
  selectedUserType: string = '';

  userRoles: string[] = ["Admin", "Essential User", "Essential Admin"]
  selectedUserRole: string = '';

  firstName: string = '';
  lastName: string = '';
  phoneNumber: string = '';
  email: string = '';
  confirmPassword: string = '';
  password: string = '';

  userCurrencies: string[] = ["€ EUR (Euros)", "$ USD (US Dollars)"];
  selectedUserCurrency: string = ''

  numberFormats: string[] = [
    "1,000,000.00(English)",
    "1.000.000,00(German)",
    "1,00,00,000.00(India)"
  ]
  selectedNumberFormat: string = '';

  measurementSystems: string[] = ["Metric", "US", "UK"];
  selectedMeasurementSystem: string = ''

  decimalPlaces: string[] = ["2", "3"];
  selectedDecimalPlace: string = ''

  userStatus: boolean = true;
  selectedUserStatus: boolean = true;

  userTeams = [
    { label: 'Sales Coordinator', value: 'Sales Coordinator', checked: false },
    { label: 'Pricing', value: 'Pricing', checked: false },
  ]
  selectedUserTeams!: string[]

  onCancelCreate(event: Event) {
    event.preventDefault();
    this.toggleOffUserModal.emit()
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if(this.mode === 'create') {
      this.selectedUserTeams = this.userTeams
        .filter(team => team.checked)
        .map(team => team.value);

      this.apiService.createUser({
        userType: this.selectedUserType,
        userRole: this.selectedUserRole,
        firstName: this.firstName, lastName: this.lastName,
        phoneNumber: Number(this.phoneNumber), email: this.email,
        password: this.password, confirmPassword: this.confirmPassword,
        userCurrency: this.selectedUserCurrency,
        numberFormat: this.selectedNumberFormat,
        measurementSystem: this.selectedMeasurementSystem,
        decimalPlaces: Number(this.selectedDecimalPlace),
        userStatus: this.selectedUserStatus,
        userTeam: this.selectedUserTeams,
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now())
      }).subscribe((res: any) => {
        alert("User Created Successfully")
        users.update(users => [
          ...users,
          {
            id: "",
            userType: this.selectedUserType,
            userRole: this.selectedUserRole,
            firstName: this.firstName, lastName: this.lastName,
            phoneNumber: Number(this.phoneNumber), email: this.email,
            password: this.password, confirmPassword: this.confirmPassword,
            userCurrency: this.selectedUserCurrency,
            numberFormat: this.selectedNumberFormat,
            measurementSystem: this.selectedMeasurementSystem,
            decimalPlaces: Number(this.selectedDecimalPlace),
            userStatus: this.selectedUserStatus,
            userTeam: this.selectedUserTeams,
            createdAt: new Date(Date.now()),
            updatedAt: new Date(Date.now())
          },
        ]);
      })

      this.toggleOffUserModal.emit()
    }
    else if(this.mode === 'edit') {
      console.log('User Id: ', this.selectedUserId);
      this.apiService.editUser({
        userType: this.selectedUserType,
        userRole: this.selectedUserRole,
        firstName: this.firstName, lastName: this.lastName,
        phoneNumber: Number(this.phoneNumber), email: this.email,
        password: this.password, confirmPassword: this.confirmPassword,
        userCurrency: this.selectedUserCurrency,
        numberFormat: this.selectedNumberFormat,
        measurementSystem: this.selectedMeasurementSystem,
        decimalPlaces: Number(this.selectedDecimalPlace),
        userStatus: this.selectedUserStatus,
        userTeam: this.selectedUserTeams,
        updatedAt: new Date(Date.now())
      }, this.selectedUser.id).subscribe((res: any) => {
        alert("User Updated Successfully")

        users.update(users =>
          users.map((u: Response) => u.id === this.selectedUserId ? {
            ...u,
            userType: this.selectedUserType,
            userRole: this.selectedUserRole,
            firstName: this.firstName, lastName: this.lastName,
            phoneNumber: Number(this.phoneNumber), email: this.email,
            password: this.password, confirmPassword: this.confirmPassword,
            userCurrency: this.selectedUserCurrency,
            numberFormat: this.selectedNumberFormat,
            measurementSystem: this.selectedMeasurementSystem,
            decimalPlaces: Number(this.selectedDecimalPlace),
            userStatus: this.selectedUserStatus,
            userTeam: this.selectedUserTeams,
            updatedAt: new Date(Date.now())
          } : u)
        );
      })

      this.toggleOffUserModal.emit()
    }
  }

  isViewMode(): boolean {
    return this.mode === 'view';
  }

  onUserTypeChange(value: string) {
    this.selectedUserType = value;
    console.log('Selected User Type', value)
  }

  onUserRoleChange(value: string) {
    this.selectedUserRole = value;
    console.log('Selected User Role', value)
  }

  onFirstNameChange(value: string) {
    this.firstName = value;
    console.log("FirstName: ", value)
  }

  onLastNameChange(value: string) {
    this.lastName = value;
    console.log("LastName: ", value)
  }

  onPhoneNumberChange(value: string) {
    this.phoneNumber = value;
    console.log("Phone Number: ", value)
  }

  onEmailChange(value: string) {
    this.email = value;
    console.log("Email: ", value)
  }

  onPasswordInput(value: string) {
    this.password = value;
  }

  onConfirmPassword(value: string) {
    this.confirmPassword = value;
  }

  onUserCurrencyChange(value: string) {
    this.selectedUserCurrency = value;
    console.log("User Currency: ", value)
  }

  onNumberFormatChange(value: string) {
    this.selectedNumberFormat = value;
    console.log("Number Format: ", value)
  }

  onMeasureChange(value: string) {
    this.selectedMeasurementSystem = value;
    console.log("Measurement System: ", value)
  }

  onDecimalChange(value: string) {
    this.selectedDecimalPlace = value;
    console.log("Decimal Place: ", value)
  }

  toggleUserStatus(event: Event) {
    event.preventDefault()
    const userStatusBtn = document.getElementById('#user-stat-btn');
    const userStatusOuter = document.getElementById('#user-stat-outer');

    if(this.userStatus) {
      userStatusBtn?.classList.replace('right-1', 'left-1')
      userStatusBtn?.classList.replace('bg-blue-400', 'bg-gray-400')
      userStatusOuter?.classList.replace('border-blue-400', 'border-gray-400')
    } else {
      userStatusBtn?.classList.replace('left-1', 'right-1')
      userStatusBtn?.classList.replace('bg-gray-400', 'bg-blue-400')
      userStatusOuter?.classList.replace('border-gray-400', 'border-blue-400')
    }
    this.userStatus = !this.userStatus
    this.selectedUserStatus = this.userStatus
    console.log(this.userStatus)
  }

}

