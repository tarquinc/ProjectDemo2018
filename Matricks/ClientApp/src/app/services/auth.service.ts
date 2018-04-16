import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable()
export class AuthService {
  loginUrl = 'http://localhost:52985/api/auth/login/'
  registerUrl = 'http://localhost:52985/api/auth/register/'

  constructor(private http: HttpClient) { }

  login(value: string) {
    const contentHeader = new HttpHeaders({ 'Content-type': 'application/json' });
    return this.http.post(this.loginUrl, value, { headers: contentHeader })
  }

  register(value: string) {
    const contentHeader = new HttpHeaders({ 'Content-type': 'application/json' });
    return this.http.post(this.registerUrl, value, {headers: contentHeader})
  }
}
