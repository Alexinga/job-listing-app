import { Component, DestroyRef, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router, RouterLink } from '@angular/router';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, SpinnerComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private authService = inject(AuthService);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);
  isLoading = signal(false);
  errCaught = signal('');

  loginForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required],
    }),
    password: new FormControl('', {
      validators: [Validators.required],
    }),
  });

  get loginFormControls() {
    return this.loginForm.controls;
  }
  get invalidEmail() {
    return (
      this.loginFormControls.email.invalid &&
      this.loginFormControls.email.touched
    );
  }

  get invalidPassword() {
    return (
      this.loginFormControls.password.invalid &&
      this.loginFormControls.password.touched
    );
  }

  onLogin() {
    this.isLoading.set(true);
    const loginData = {
      email: this.loginFormControls.email.value!,
      password: this.loginFormControls.password.value!,
    };

    const subscription = this.authService.authSignIn(loginData).subscribe({
      next: (res) => {
        if (res.access_token) {
          console.log(`Logged In Response:`, res);
          this.loginForm.reset();
          localStorage.setItem('authToken', res?.access_token);
          this.router.navigate(['/'], { replaceUrl: true });
        }
      },
      error: (err: Error) => {
        this.isLoading.set(false);
        this.loginForm.reset();
        this.errCaught.set(err.message);
      },
      complete: () => {
        this.isLoading.set(false);
      },
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
