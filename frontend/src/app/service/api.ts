import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Api {

  private serverUrl = "http://localhost:5000/api/"

  constructor(private http: HttpClient) {}
  getUsers() {
    return this.http.get(`${this.serverUrl}users`)
  }
}
