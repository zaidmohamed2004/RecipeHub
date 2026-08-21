import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class Auth {

  private apiUrl = 'http://localhost:7777/users';

  constructor(private http: HttpClient) {}

  login(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.apiUrl}/login`,
      data
    );
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  saveUser(user: LoginResponse['user']): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): LoginResponse['user'] | null {
    const user = localStorage.getItem('user');

    if (!user) {
      return null;
    }

    try {
      return JSON.parse(user) as LoginResponse['user'];
    } catch {
      return null;
    }
  }

  isAdmin(): boolean {
    return this.getUser()?.role === 'admin';
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}