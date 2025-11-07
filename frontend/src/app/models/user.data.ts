import {signal} from '@angular/core';
import {CustomErrorHandler, Response} from './user.types';

export const users = signal<Response[]>([])

export const errorHandler = signal<CustomErrorHandler>({
    errorStatus: false,
    errorLocation: []
});
