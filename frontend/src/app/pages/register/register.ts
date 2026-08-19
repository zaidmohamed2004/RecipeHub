import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  user = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  handleSubmit(form: NgForm) {

    if (form.invalid) {
      return;
    }

    if (this.user.password !== this.user.confirmPassword) {
      return;
    }

    console.log('Form submitted:', this.user);
  }
}