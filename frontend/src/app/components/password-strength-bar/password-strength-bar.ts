import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-password-strength-bar',
  imports: [CommonModule],
  templateUrl: './password-strength-bar.html',
  styleUrl: './password-strength-bar.css'
})
export class PasswordStrengthBar {
  @Input() password!: string;

  strengthText: string = "";
  strength = 0;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['password']) this.updateStrength();
  }

  updateStrength() {
    this.strength = this.getStrength(this.password);
    this.getStrengthText()
  }

  getStrength(password: string) {
    let strength = 0;
    if(password.length >= 6) strength++;
    if(password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if(password.match(/\d/)) strength++;
    if(password.match(/[^a-zA-Z\d]/)) strength++

    return strength;
  }

  getStrengthText() {
    const strength = this.getStrength(this.password);

    if(strength === 0) this.strengthText = "Very Weak";
    if(strength === 1) this.strengthText = "Weak"
    if(strength === 2) this.strengthText = "Fair"
    if(strength === 3) this.strengthText = "Good"
    if(strength >= 4) this.strengthText = "Very Good"

  }

  
}
