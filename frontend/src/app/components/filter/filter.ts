import { Component, inject } from '@angular/core';
import { LucideAngularModule, SlidersHorizontal, Search, X } from 
'lucide-angular';

import { UserService } from '../../service/user-service';
import { FilterDropdown } from '../filter-dropdown/filter-dropdown';
import { FilterType } from '../../models/user.types';

@Component({
  selector: 'app-filter',
  imports: [LucideAngularModule, FilterDropdown],
  templateUrl: './filter.html',
  styleUrl: './filter.css'
})
export class Filter {
  readonly SlidersHorizontal = SlidersHorizontal

  clearSignal: boolean = false;

  userService = inject(UserService)

  userType: string = '';
  userStatus: string = '';
  filters: FilterType = {};

  onDropdownFilter(filter: FilterType) {
    this.filters = { ...this.filters, ...filter };
    this.applyFilters()
  }

  onUserTypeChange(value: string) {
    this.filters.userType = value;
    this.applyFilters()
  }

  onStatusChange(value: string) {
    this.filters.userStatus = value === 'Active' ? true : false;
    this.applyFilters()
  }

  applyFilters() {
    this.userService.getFilteredUsers(this.filters)
  }


  onClearAll(e: Event) {}


}
