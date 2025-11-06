import {Component, EventEmitter, inject, Input, numberAttribute, Output} from '@angular/core';
import { Api } from '../../service/api';

import {LucideAngularModule, UserRoundPen, Eye, Trash2} from 'lucide-angular';
import {Response, User} from '../../models/user.types';

@Component({
  selector: 'app-table',
  imports: [LucideAngularModule],
  templateUrl: './table.html',
  styleUrl: './table.css'
})

export class Table {

  readonly UserRoundPen = UserRoundPen;
  readonly Eye = Eye;
  readonly Trash = Trash2;

  @Output() toggleOnUserModal = new EventEmitter<{
    mode: 'edit' | 'view',
    user: Response
  }>();

  users: Response[] = []
  result:any = null;

  apiService = inject(Api);

  ngOnInit(): void {
    this.displayUsers()
  }

  displayUsers() {
    const result = this.apiService.getUsers().subscribe((res: any) => {
      this.users = res.users.map((user: any) => {
        return {
          ...user,
          createdAt: new Date(user.createdAt),
        }

      });
    })
  }
  editUserModal(user: Response): void {
    this.toggleOnUserModal.emit({
      mode: 'edit',
      user: user,
    });
    console.log("From table: ", user)
    console.log('Editing')
  }

  viewUserModal(user: Response) {
    this.toggleOnUserModal.emit({
      mode: 'view',
      user: user
    });
    console.log('Viewing user')
  }


}
