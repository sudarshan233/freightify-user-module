import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { InputButtons } from './components/input-buttons/input-buttons';
import { HttpClient } from '@angular/common/http';
import { Table } from './components/table/table';
import { Api } from './service/api';
import { CreateUser } from './components/create-user/create-user';

@Component({
  selector: 'app-root',
  imports: [Header, InputButtons, Table, CreateUser],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
}
