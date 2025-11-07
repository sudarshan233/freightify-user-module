import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

type User = {
	userType: string
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
	userTeam: string[]
	createdAt?: Date
	updatedAt: Date
}

@Injectable({
  providedIn: 'root'
})
export class Api {

  private serverUrl = "http://localhost:5000/api/"

  constructor(private http: HttpClient) {}
  getUsers() {
    return this.http.get(`${this.serverUrl}users`)
  }

  createUser(user: User) {
    return this.http.post(`${this.serverUrl}create`, user)
  }

  editUser(user: User, id: string) {
    return this.http.put(`${this.serverUrl}users/${id}`, user)
  }

  deleteUser(id: string) {
    return this.http.delete(`${this.serverUrl}users/${id}`)
  }
}
