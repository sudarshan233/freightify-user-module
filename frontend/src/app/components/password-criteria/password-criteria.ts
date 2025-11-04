import { Component, Input, SimpleChanges } from '@angular/core';
import { LucideAngularModule, Check, X } from 'lucide-angular';

type CriteriaForPassword = {
  label: string
  met: boolean
}

@Component({
  selector: 'app-password-criteria',
  imports: [LucideAngularModule],
  templateUrl: './password-criteria.html',
  styleUrl: './password-criteria.css'
})
export class PasswordCriteria {
  @Input() password:string = '';
  
  readonly Check = Check;
  readonly X = X;

  criteria: CriteriaForPassword[] = []

  ngOnChanges(changes: SimpleChanges) {
    if (changes['password']) this.updateCriteria();
  }

  updateCriteria() {
    const passwd = this.password || ''
    this.criteria = [
      { label: "At least 8 characters", met: passwd.length >= 6 },
      { label: "Contains uppercase letter", met: /[A-Z]/.test(passwd) },
      { label: "Contains lowercase letter", met: /[a-z]/.test(passwd) },
      { label: "Contains number", met: /[0-9]/.test(passwd) },
      { label: "Contains special character", met: /[^A-Za-z0-9]/.test(passwd) }
    ];
  }

}
