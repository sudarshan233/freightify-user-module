import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LucideAngularModule, Eye, EyeOff } from 'lucide-angular';
import {CommonModule, NgClass} from '@angular/common';
import { errorHandler } from '../../models/user.data';

@Component({
  selector: 'app-typing-input',
  imports: [LucideAngularModule, NgClass],
  templateUrl: './typing-input.html',
  styleUrl: './typing-input.css'
})
export class TypingInput {
  @Input() label!: string;
  @Input() type!: string;
  @Input() input!: string;
  @Input() disabled!: boolean;
  @Input() placeholder!: string;

  @Input() value: string = '';
  @Output() valueChange = new EventEmitter<string>();

  readonly EyeOff = EyeOff;
  readonly Eye = Eye;

  showPassword: boolean = false;

  hasError(): boolean {
    const e = errorHandler()
    return e.errorStatus && e.errorLocation.includes(this.label);
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
    this.type = this.type === "password" ? "text" : "password"
  }

  onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.value = input.value;

     if(this.value) {
      errorHandler.update(e => ({
        errorStatus: false,
        errorLocation: e.errorLocation.filter(location => this.label !== location)
      }))
    }
    
    this.valueChange.emit(this.value);
  }

}
