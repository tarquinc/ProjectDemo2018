import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model = new User();

  constructor() { }

  ngOnInit() {
    //this.model.username;
    //this.model.password;
    //this.model.confirmPassword
  }

  login() {
    console.log(this.model);
  }

  register() {
    console.log(this.model);
  }
}

class User {
  username: string;
  password: string;
  confirmPassword: string
}
