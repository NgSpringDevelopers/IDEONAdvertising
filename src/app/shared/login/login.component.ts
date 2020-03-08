import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public loginService: LoginService) { }

  ngOnInit() {
  }
  onLogin() {
    const user = {
      username: 'administrator',
      password: '1de0nAdd'
    };
    this.loginService.loginUser(user);
  }

}
