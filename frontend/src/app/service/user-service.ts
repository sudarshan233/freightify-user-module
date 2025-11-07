import { inject, Injectable } from '@angular/core';
import { Api } from "../service/api";
import { users } from '../models/user.data';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiService = inject(Api)
  getUsers() {
      users.length = 0;
      const result = this.apiService.getUsers().subscribe((res: any) => {
        res.users.map((user: any) => {
          users.push({
            ...user,
            createdAt: new Date(user.createdAt)
          })
        });
      })
  }
}
