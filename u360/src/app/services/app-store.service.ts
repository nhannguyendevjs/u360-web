import { Injectable, signal } from '@angular/core';
import * as UsersType from '../types/users.type';

@Injectable({
  providedIn: 'root',
})
export class AppStoreService {
  me = signal<UsersType.User | null>(null);
}
