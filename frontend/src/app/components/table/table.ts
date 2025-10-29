import { Component, inject, numberAttribute } from '@angular/core';
import { Api } from '../../service/api';

type User = {
  name: string
  email: string
  role: string
  createdAt: string
  status: "Active" | "Inactive"
}

type Response = {
  usertype: string
  userRole: string
  firstName: string
  lastName: string
  phoneNumber: number
  email: string
  password: string
  confirmPassword: string
  userCurrency: string
  numberFormat: string
  measurementSystem: string
  decimalPlaces: number
  userStatus: boolean
  userTeam: string
  createdAt: Date
  updatedAt: Date

}

@Component({
  selector: 'app-table',
  imports: [],
  templateUrl: './table.html',
  styleUrl: './table.css'
})

export class Table {
  users: User[] = []
  result:any = null;

  apiService = inject(Api);

  ngOnInit(): void {
    this.displayUsers()
  }

  displayUsers() {
    const result = this.apiService.getUsers().subscribe((res: any) => {
      res.map((user: Response) => {
        const {
          firstName, lastName,
          email, userRole,
          createdAt, userStatus
        } = user;

        const name: string = firstName + " " + lastName;
        const status: "Active" | "Inactive" = userStatus ? "Active" : "Inactive"
        const createdDate: Date = new Date(createdAt)
        const formattedDate: string = createdDate.toISOString().split('T')[0] 
        this.users.push({
          name,
          email,
          role: userRole,
          createdAt: formattedDate,
          status
        })
      })
    })
  }
}
