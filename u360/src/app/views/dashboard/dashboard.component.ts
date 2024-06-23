import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { AppStoreService } from '../../services/app-store.service';
import * as UserTypes from '../../types/users.type';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  #appStoreService = inject(AppStoreService);
  #destroyRef = inject(DestroyRef);

  currentUser = signal<UserTypes.User>(null);

  constructor() {
    toObservable(this.#appStoreService.me)
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((user) => {
        this.currentUser.set(user);
      });
  }
}
