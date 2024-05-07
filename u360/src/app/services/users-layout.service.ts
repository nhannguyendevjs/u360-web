import { Injectable, Signal } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root',
})
export class UsersLayoutService {
  userFilters!: Signal<MatDrawer>;
}
