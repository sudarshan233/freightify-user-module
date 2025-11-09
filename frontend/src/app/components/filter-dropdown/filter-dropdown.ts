import { Component, EventEmitter, Input, Output } from '@angular/core';
import { users } from '../../models/user.data';
import { LucideAngularModule, Search, X } from 'lucide-angular';
import { FilterType, Response } from '../../models/user.types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filter-dropdown',
  imports: [LucideAngularModule, CommonModule],
  templateUrl: './filter-dropdown.html',
  styleUrl: './filter-dropdown.css'
})
export class FilterDropdown {
  @Input() criteriaLabel!: string
  @Input() placeholder!: string

  @Output() selectedFilters = new EventEmitter<FilterType>()

  readonly Search = Search
  readonly X = X

  protected readonly users = users;
  protected roles: string[] = ["Admin", "Essential User", "Essential Admin"];

  selectDropDown: boolean = false;
  selectedUsers: string[] = [];
  selectedFirstNames: string[] = [];
  selectedUserRoles: string[] = [];

  onClickSearch() {
    this.selectDropDown = true;
  }

  selectUser(user: Response, event: Event) {
    event.preventDefault();

    const userName = user.firstName + ' ' + user.lastName;
    this.selectedFirstNames.push(user.firstName);
    this.selectedUsers.push(userName);
  }

  selectUserRole(role: string, event: Event) {
    event.preventDefault();
    this.selectedUserRoles.push(role);
  }

  isUserSelected(user: Response): boolean {
    const userName = user.firstName + ' ' + user.lastName;
    return this.selectedUsers.includes(userName)
  }

  isUserRoleSelected(role: string): boolean {
    return this.selectedUserRoles.includes(role)
  }

  onRemoveUser(selectedUser: string) {
    this.selectedUsers = this.selectedUsers.filter(
      user => user != selectedUser
    )
  }

  onRemoveUserRole(selectedUserRole: string) {
    this.selectedUserRoles = this.selectedUserRoles.filter(
      role => role != selectedUserRole
    )
  }

  onConfirmFilter(e: Event) {
    e.preventDefault();
    let filter: FilterType = {}

    if (this.criteriaLabel === 'User Details' && this.selectedFirstNames.length > 0) {
      
      filter.search = this.selectedFirstNames.join(' ');
    } 
    else if (this.criteriaLabel === 'Roles' && this.selectedUserRoles.length > 0) {
     
      filter.userRole = this.selectedUserRoles.join(',');
    }

    this.selectedFilters.emit(filter)
    this.selectDropDown = false;
  }

  onClearFilter() {
    this.selectedUsers = []
    this.selectedUserRoles = []
  }
}
