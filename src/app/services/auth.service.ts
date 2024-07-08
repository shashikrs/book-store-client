import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, credentials);
  }

  register(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, credentials);
  }

  refreshToken(token: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/refresh_token`, {
      access_token: token,
    });
  }

  getToken(): string | null {
    return localStorage.getItem('access_token'); // Make sure to return null if not found
  }

  setToken(token: string): void {
    localStorage.setItem('access_token', token);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
