import { inject, Injectable } from '@angular/core';
import { Api } from "../service/api";
import { filteredUsers, totalUsers, users } from '../models/user.data';
import { FilterType, Response } from '../models/user.types';

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
        totalUsers.set(users.length)
      })
  }

  getFilteredUsers(filter: FilterType) {
    this.apiService.filterUser(filter).subscribe((res: any) => {
      res.users.forEach((user: any) => {
        const newUser = {
          ...user,
          createdAt: new Date(user.createdAt)
        };

        // ✅ Check for duplicates before pushing
        const exists = filteredUsers.some(
          (existing: Response) => existing.id === newUser.id
        );

        if (!exists) {
          filteredUsers.push(newUser);
        }
      });

      totalUsers.set(filteredUsers.length);
    });
  }
}
