import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';

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

  handleSubmit(form: NgForm) {

    if (form.invalid) {
      return;
    }

    console.log('Login data:', this.user);
  }
}