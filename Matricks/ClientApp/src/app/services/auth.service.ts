import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { RegisterComponent } from '../register/register.component';


@Injectable()
export class AuthService {
  baseUrl = 'http://localhost:52985/api/auth/'

  constructor(private http: HttpClient) { }
  //constructor() { }

  login(value) {
    const contentHeader = new HttpHeaders({ 'Content-type': 'application/json' });
    return this.http.post(this.baseUrl+"login", value, { headers: contentHeader })
  }

  register(value) {
    const contentHeader = new HttpHeaders({ 'Content-type': 'application/json' });
    return this.http.post(this.baseUrl+"register", value, {headers: contentHeader})
  }
}
