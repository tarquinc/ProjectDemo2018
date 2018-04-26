import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { AuthService } from '../services/auth.service'
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model = {};

  constructor(private AuthService: AuthService) { }

  ngOnInit() {
  }

  login() {
    console.log(this.model);
    this.AuthService.login(this.model).subscribe();
  }

}
