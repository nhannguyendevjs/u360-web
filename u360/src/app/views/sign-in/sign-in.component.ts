import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, Host, HostListener, Renderer2, inject, signal, viewChild } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LocalStorageKeys } from '../../enums/local-storage';
import { ShellActions } from '../../enums/shell';
import { AuthService } from '../../services/auth.service';
import * as UserActions from '../../stores/actions/user.actions';
import { AppStore } from '../../types/store.type';

const MaterialModules = [MatCardModule, MatIconModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatProgressBarModule, MatCheckboxModule];

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ...MaterialModules],
  templateUrl: './sign-in.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent {
  #authService = inject(AuthService);
  #appStore = inject(Store) as Store<AppStore>;
  #router = inject(Router);
  #formBuilder = inject(FormBuilder);

  errorMessage = signal<string>('');

  isShowPassword = signal<boolean>(false);

  signInForm = this.#formBuilder.group({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor() {
    if (this.#authService.isSignedIn()) {
      this.#router.navigate(['/'], { queryParams: { action: ShellActions.signIn } });
    }
  }

  markFormGroupAsDirty() {
    this.signInForm.markAsDirty();
  }

  markAllAsTouched() {
    this.signInForm.controls.username.markAsTouched();
    this.signInForm.controls.password.markAsTouched();
  }

  signIn() {
    this.markFormGroupAsDirty();
    this.markAllAsTouched();

    if (this.signInForm.valid) {
      const { username, password } = this.signInForm.value;

      this.#authService.signIn(username, password).subscribe({
        next: (res) => {
          if (res.success) {
            const { accessToken, user } = res.data;
            localStorage.setItem(LocalStorageKeys.authorization, accessToken);
            this.#appStore.dispatch(UserActions.setUser(user));
            this.#router.navigate(['/'], { queryParams: { action: ShellActions.signIn } });
          }
        },
        error: (err) => {
          this.errorMessage.set(err.error.message);
        },
      });
    }
  }

  @HostListener('document:keydown.enter', ['$event']) onEnter(event: KeyboardEvent) {
    if (event.target instanceof HTMLInputElement && event.target.hasAttribute('matinput')) {
      event.preventDefault();
      this.signIn();
    }
  }
}
