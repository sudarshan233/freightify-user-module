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
  @Input() disabled!: boolean

  @Input() value: string = ''
  @Output() valueChange = new EventEmitter<string>();

  selectDropDown: boolean = false
  selectedValue: string = '';

  showDropDown() {
    if(this.disabled) return;
    this.selectDropDown = true
  }

  selectOption(option: string) {
    if(this.disabled) return;
    this.selectedValue = option;
    this.selectDropDown = false;

    this.value = option;
    this.valueChange.emit(option)
  }
}
