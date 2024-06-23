import { NgIf, UpperCasePipe } from '@angular/common';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterLink } from '@angular/router';
import { AppNavService } from '../../services/app-nav.service';
import { AppStoreService } from '../../services/app-store.service';
import * as UserTypes from '../../types/users.type';

const MaterialModules = [MatIconModule, MatButtonModule, MatMenuModule, MatDivider, MatToolbarModule, MatTooltipModule, MatTooltipModule];

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, UpperCasePipe, NgIf, ...MaterialModules],
  templateUrl: './nav-bar.component.html',
})
export class NavBarComponent {
  #router = inject(Router);
  #appStoreService = inject(AppStoreService);
  #appNavService = inject(AppNavService);
  #destroyRef = inject(DestroyRef);

  currentUser = signal<UserTypes.User>(null);

  constructor() {
    toObservable(this.#appStoreService.me)
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((user) => {
        this.currentUser.set(user);
      });
  }

  toggleMenu() {
    this.#appNavService.toggleMenu();
  }

  signOut() {
    localStorage.clear();
    this.#appStoreService.me.set(null);
    this.#router.navigate(['/sign-in']);
  }
}
