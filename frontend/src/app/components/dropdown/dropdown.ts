import { Component, Input, Output, EventEmitter } from '@angular/core';
import { LucideAngularModule, ChevronDown } from 'lucide-angular';


@Component({
  selector: 'app-dropdown',
  imports: [LucideAngularModule],
  templateUrl: './dropdown.html',
  styleUrl: './dropdown.css'
})
export class Dropdown {
  readonly ChevronDown = ChevronDown

  @Input() label!: string
  @Input() options!: string[]
  @Input() info!: string

  @Output() valueChange = new EventEmitter<string>();

  selectDropDown: boolean = false
  selectedValue: string = '';

  showDropDown() {
    this.selectDropDown = true
  }

  selectOption(option: string) {
    this.selectedValue = option;
    this.selectDropDown = false;

    this.valueChange.emit(option)
  }
}
