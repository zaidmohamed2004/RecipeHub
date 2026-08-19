import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  user = {
    email: '',
    password: ''
  };

  loading = false;
  error = '';

  constructor(
    private auth: Auth,
    private router: Router
  ) {}

  handleSubmit(form: NgForm): void {

    if (form.invalid) {
      return;
    }

    this.loading = true;
    this.error = '';

    this.auth.login(this.user).subscribe({

      next: (response) => {
        console.log('Login successful:', response);

        this.auth.saveToken(response.token);

        this.loading = false;

        this.router.navigate(['/cart']);
      },

      error: (err) => {
        console.error('Login error:', err);

        this.loading = false;

        this.error =
          err.error?.error ||
          'Invalid Email or Password';
      }

    });
  }
}