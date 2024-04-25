import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { APIs } from '../enums/api';
import { LocalStorageKeys } from '../enums/local-storage';
import * as AuthType from '../types/auth.type';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  #http = inject(HttpClient);

  isSignedIn() {
    const accessToken = localStorage.getItem(LocalStorageKeys.authorization);

    return !!accessToken;
  }

  signIn(username: string, password: string) {
    return this.#http.post<AuthType.SignInResponse>(APIs.auth.signIn, { account: { username, password } });
  }

  me() {
    return this.#http.get<AuthType.MeResponse>(APIs.auth.me);
  }
}
