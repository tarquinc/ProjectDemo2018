import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { AuthService } from '../services/auth.service'
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model = {};

  constructor(private AuthService: AuthService) { }
  //constructor() { }

  ngOnInit() {
  
  }

  //login() {
  //  console.log(this.model);
  //}

  register() {
    console.log(this.model);
    this.AuthService.register(this.model).subscribe();
  }
}

class User {
  constructor(public username: string, public password: string) { }
}
