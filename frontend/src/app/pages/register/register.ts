import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface RegisterResponse {
  message: string;
  data: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  };
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

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  handleSubmit(form: NgForm): void {

    if (form.invalid) {
      return;
    }

    if (this.user.password !== this.user.confirmPassword) {
      this.error = 'Passwords do not match.';
      return;
    }

    this.loading = true;
    this.error = '';
    this.success = '';

    const registerData = {
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      password: this.user.password
    };

    this.http.post<RegisterResponse>(
      'http://localhost:7777/users/register',
      registerData
    ).subscribe({

      next: (response) => {
        this.loading = false;
        this.success = response.message;

        this.router.navigate(['/login']);
      },

      error: (err) => {
        this.loading = false;

        this.error =
          err.error?.error ||
          'Registration failed. Please try again.';
      }

    });
  }
}