import { Injectable, signal } from '@angular/core';
import * as UserTypes from '../types/users.type';

@Injectable({
  providedIn: 'root',
})
export class AppStoreService {
  me = signal<UserTypes.User | null>(null);
}
