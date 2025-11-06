import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LucideAngularModule, Eye, EyeOff } from 'lucide-angular';

@Component({
  selector: 'app-typing-input',
  imports: [LucideAngularModule],
  templateUrl: './typing-input.html',
  styleUrl: './typing-input.css'
})
export class TypingInput {
  @Input() label!: string;
  @Input() type!: string;
  @Input() input!: string;
  @Input() placeholder!: string;

  @Input() value: string = '';
  @Output() valueChange = new EventEmitter<string>();

  readonly EyeOff = EyeOff;
  readonly Eye = Eye;

  showPassword: boolean = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
    this.type = this.type === "password" ? "text" : "password"
  }

  onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.valueChange.emit(this.value);
  }

}
