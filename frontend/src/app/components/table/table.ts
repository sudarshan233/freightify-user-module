import {Component, EventEmitter, inject, Input, numberAttribute, Output} from '@angular/core';
import { Api } from '../../service/api';

import {LucideAngularModule, UserRoundPen, Eye, Trash2} from 'lucide-angular';
import {Response, User} from '../../models/user.types';
import {users} from '../../models/user.data';

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

  @Output() sendUser = new EventEmitter<{
    user: Response
  }>();

  result:any = null;

  apiService = inject(Api);

  ngOnInit(): void {
    this.displayUsers()
  }

  displayUsers() {
    const result = this.apiService.getUsers().subscribe((res: any) => {
      res.users.map((user: any) => {
        users.update(users => [
          ...users,
          {
            ...user,
            createdAt: new Date(user.createdAt),
          }
        ]);
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
    console.log("From table: ", user)
    console.log('Viewing user')
  }

  deleteUser(user: Response) {
    console.log(user)
    this.apiService.deleteUser(user.id).subscribe((res: any) => {
      alert("User has been deleted successfully!");
      users.update(users => users.filter(u => u.id !== user.id));
    });
  }
  protected readonly users = users;
}
