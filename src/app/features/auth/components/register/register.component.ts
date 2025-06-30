import { Component, DestroyRef, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule, SpinnerComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);
  isLoading = signal(false);
  errMsg = signal('');

  registerForm = new FormGroup({
    registerEmail: new FormControl('', {
      validators: [Validators.email, Validators.required],
    }),
    registerPassword: new FormControl('', {
      validators: [Validators.required],
    }),
  });

  get registerControl() {
    return this.registerForm.controls;
  }

  get invalidRegisterEmail() {
    return (
      this.registerControl.registerEmail.invalid &&
      this.registerControl.registerEmail.touched
    );
  }

  get invalidRegisterPassword() {
    return (
      this.registerControl.registerPassword.invalid &&
      this.registerControl.registerPassword.touched
    );
  }

  onRegister() {
    this.isLoading.set(true);
    const registerData = {
      email: this.registerControl.registerEmail.value!,
      password: this.registerControl.registerPassword.value!,
    };

    const subscription = this.authService.authSignUp(registerData).subscribe({
      next: (res) => {
        if (res.user && res.session) {
          console.log(res);
          this.registerForm.reset();
          localStorage.setItem('authSignUpToken', res.session.access_token);
          this.router.navigate(['/'], { replaceUrl: true });
        }
      },
      error: (err: Error) => {
        this.isLoading.set(false);
        this.registerForm.reset();
        this.errMsg.set(err.message);
      },
      complete: () => {
        this.isLoading.set(false);
      },
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
