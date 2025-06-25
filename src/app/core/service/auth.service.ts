import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { authHeaders } from '../../../environments/environment';
import {
  Login,
  SupabaseLoginResponse,
  SupabaseSignupResponse,
} from '../../data/schema/login';
import { catchError, map, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private authURL = 'https://yonxcfogpkhznygsaugw.supabase.co/auth/v1/';

  authSignIn(loginForm: Login) {
    return this.http
      .post<SupabaseLoginResponse>(
        `${this.authURL}token?grant_type=password`,
        loginForm,
        {
          headers: authHeaders,
        }
      )
      .pipe(
        map((res) => res),
        catchError((err: HttpErrorResponse) => {
          let message = 'An unexpected error occurred. Please Try Again.';
          if (err.status === 400 || err.status === 401) {
            message = 'Email or Password is incorrect. Please Try Again.';
          } else if (err.message) {
            message = `${err.message}`;
          }
          return throwError(() => new Error(message));
        })
      );
  }

  authSignUp(registerForm: Login) {
    return this.http
      .post<SupabaseSignupResponse>(`${this.authURL}signup`, registerForm, {
        headers: authHeaders,
      })
      .pipe(
        map((res) => res),
        catchError((err: HttpErrorResponse) => {
          const message = err.message;
          return throwError(() => new Error(message));
        })
      );
  }
}
