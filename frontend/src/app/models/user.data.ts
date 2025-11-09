import {signal} from '@angular/core';
import {CustomErrorHandler, Response} from './user.types';

export const users: Response[] = [];
export const filteredUsers: Response[] = []
export const totalUsers = signal<number>(0)

export const errorHandler = signal<CustomErrorHandler>({
    errorStatus: false,
    errorLocation: []
});
