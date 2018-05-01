import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { RegisterComponent } from '../register/register.component';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';
import 'rxjs/add/operator/map';


@Injectable()
export class AuthService {
  baseUrl = 'http://localhost:52985/api/auth/'

  constructor(private http: HttpClient, private jwtHelperService: JwtHelperService) { }
  //constructor() { }

  //login(value) {
  //  const contentHeader = new HttpHeaders({ 'Content-type': 'application/json' });
  //  return this.http.post(this.baseUrl+"login", value, { headers: contentHeader })
  //}

  register(value) {
    const contentHeader = new HttpHeaders({ 'Content-type': 'application/json' });
    return this.http.post(this.baseUrl+"register", value, {headers: contentHeader})
  }

  login(user) {
    return this.http.post<AuthUser>(this.baseUrl + '/auth/login', user).map((result: AuthUser) => {
      if (result) {
        localStorage.setItem('token', result.tokenString);
        localStorage.setItem('user', JSON.stringify(result.user);
      }
      return result;
    });
  }

  logout(user) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
  }

  validLog() {
    return this.jwtHelperService.isTokenExpired();
  }
}
