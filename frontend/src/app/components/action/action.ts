import {Component, EventEmitter, Input, Output} from '@angular/core';
import { Eye, LucideAngularModule, Trash2, UserRoundPen } from 'lucide-angular';


@Component({
  selector: 'app-action',
  imports: [LucideAngularModule],
  templateUrl: './action.html',
  styleUrl: './action.css'
})
export class Action {
  readonly UserRoundPen = UserRoundPen;
  readonly Eye = Eye;
  readonly Trash = Trash2;

  @Input() userId!: string;

  @Output() activateUserModal = new EventEmitter<{
    mode: 'edit' | 'view',
    userId?: string
  }>();

  editUserModal() {
    this.activateUserModal.emit({
      mode: 'edit',
      userId: this.userId
    });
    console.log('Editing')
  }

  viewUserModal() {
    this.activateUserModal.emit({
      mode: 'view',
    });
    console.log('Viewing user')
  }
}
