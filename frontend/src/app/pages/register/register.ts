import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Auth } from '../../services/auth';

interface RegisterResponse {
  message: string;
  token: string;
  data: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  };
}

interface ValidationError {
  type?: string;
  value?: string;
  msg?: string;
  path?: string;
  location?: string;
}

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  user = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  loading = false;

  error = '';

  success = '';

  backendErrors: ValidationError[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private auth: Auth
  ) { }


  handleSubmit(form: NgForm): void {

    this.error = '';
    this.success = '';
    this.backendErrors = [];


    // Mark all fields as touched
    if (form.invalid) {

      Object.values(form.controls).forEach(control => {
        control.markAsTouched();
      });

      this.focusFirstInvalidField(form);

      return;
    }


    // Password policy
    if (!this.isPasswordValid()) {

      this.error = 'Please meet all password requirements.';

      this.focusField('password');

      return;
    }


    // Confirm password
    if (this.user.password !== this.user.confirmPassword) {

      this.error = 'Passwords do not match.';

      this.focusField('confirmPassword');

      return;
    }


    this.loading = true;


    const registerData = {
      firstName: this.user.firstName.trim(),
      lastName: this.user.lastName.trim(),
      email: this.user.email.trim(),
      password: this.user.password
    };


    this.http.post<RegisterResponse>(
      'http://localhost:7777/users/register',
      registerData
    ).subscribe({

      next: (response) => {

        this.loading = false;

        this.success = response.message;

        console.log('REGISTER SUCCESS:', response);

        this.router.navigate(['/']);
      },


      error: (err) => {

        console.error('REGISTER ERROR:', err);
        console.error(
          'BACKEND VALIDATION ERRORS:',
          JSON.stringify(err.error?.errors, null, 2)
        );


        this.loading = false;


        // Backend validation errors
        if (
          err.error?.errors &&
          Array.isArray(err.error.errors)
        ) {

          this.backendErrors = err.error.errors;

          const firstError =
            this.backendErrors[0];

          this.error =
            firstError?.msg ||
            'Please check your information.';


          // Focus the field returned by backend
          if (firstError?.path) {

            this.focusField(firstError.path);
          }

          return;
        }


        // Normal backend error
        this.error =
          err.error?.error ||
          err.error?.message ||
          'Registration failed. Please try again.';
      }

    });
  }


  focusFirstInvalidField(form: NgForm): void {

    const fields = [
      'firstName',
      'lastName',
      'email',
      'password',
      'confirmPassword'
    ];


    for (const fieldName of fields) {

      const field = form.controls[fieldName];

      if (field?.invalid) {

        this.focusField(fieldName);

        return;
      }
    }
  }


  focusField(fieldName: string): void {

    setTimeout(() => {

      const element =
        document.getElementById(fieldName);

      if (!element) {
        return;
      }

      element.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });

      (element as HTMLInputElement).focus();

    }, 50);
  }


  isPasswordLengthValid(): boolean {

    return this.user.password.length >= 8;
  }


  hasUppercase(): boolean {

    return /[A-Z]/.test(this.user.password);
  }


  hasLowercase(): boolean {

    return /[a-z]/.test(this.user.password);
  }


  hasNumber(): boolean {

    return /[0-9]/.test(this.user.password);
  }


  hasSpecialCharacter(): boolean {

    return /[!@#$%^&*(),.?":{}|<>]/.test(
      this.user.password
    );
  }


  isPasswordValid(): boolean {

    return (
      this.isPasswordLengthValid() &&
      this.hasUppercase() &&
      this.hasLowercase() &&
      this.hasNumber() &&
      this.hasSpecialCharacter()
    );
  }


  getBackendError(field: string): string {

    const error = this.backendErrors.find(
      item => item.path === field
    );

    return error?.msg || '';
  }
}