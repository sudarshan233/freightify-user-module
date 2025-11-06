import {signal} from '@angular/core';
import {Response} from './user.types';

export const users = signal<Response[]>([])
