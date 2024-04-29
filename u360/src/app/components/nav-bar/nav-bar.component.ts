import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppNavService } from '../../services/app-nav.service';
import * as UserActions from '../../stores/actions/user.actions';
import { AppSelectors } from '../../stores/app-selector';
import { AppStore } from '../../types/store.type';
import * as UsersType from '../../types/users.type';

const MaterialModules = [MatIconModule, MatButtonModule, MatMenuModule, MatDivider, MatToolbarModule, MatTooltipModule, MatTooltipModule];

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterLink, MaterialModules],
  templateUrl: './nav-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBarComponent {
  #router = inject(Router);
  #appStore = inject(Store) as Store<AppStore>;
  #appNavService = inject(AppNavService);
  destroyRef = inject(DestroyRef);

  currentUser = signal<UsersType.User>(null);

  constructor() {
    AppSelectors()
      .user.pipe(takeUntilDestroyed())
      .subscribe((user) => {
        this.currentUser.set(user);
      });
  }

  toggleMenu() {
    this.#appNavService.toggleMenu();
  }

  signOut() {
    localStorage.clear();
    this.#appStore.dispatch(UserActions.resetUser());
    this.#router.navigate(['/sign-in']);
  }
}
