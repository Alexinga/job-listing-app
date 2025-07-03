import {
  afterNextRender,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router, RouterLink } from '@angular/router';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';
import { messagesService } from '../../../../shared/service/messages.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, SpinnerComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  private authService = inject(AuthService);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);
  private toastService = inject(messagesService);
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

  ngOnInit(): void {
    const savedEmail = localStorage.getItem('email');
    if (savedEmail) {
      const paredEmail: { email: string } = JSON.parse(savedEmail);
      const emailValue = paredEmail.email;
      this.loginFormControls.email.setValue(emailValue);
    }

    this.loginForm.valueChanges
      .pipe(debounceTime(500), takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (formValue) => {
          localStorage.setItem(
            'email',
            JSON.stringify({ email: formValue.email })
          );
        },
      });
  }

  onLogin() {
    this.isLoading.set(true);
    const loginData = {
      email: this.loginFormControls.email.value!,
      password: this.loginFormControls.password.value!,
    };

    this.authService
      .authSignIn(loginData)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          if (res.access_token) {
            console.log(`Logged In Response:`, res);
            this.loginForm.reset();

            localStorage.setItem('authToken', res?.access_token);
            const expiresAt = Date.now() + res.expires_in * 1000;

            localStorage.setItem('expiresAtTime', expiresAt.toString());
            this.toastService.show('Login Successful!');
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

    // this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
