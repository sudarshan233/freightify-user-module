import {signal} from '@angular/core';
import {CustomErrorHandler, Response} from './user.types';

export const users: Response[] = []

export const errorHandler = signal<CustomErrorHandler>({
    errorStatus: false,
    errorLocation: []
});
