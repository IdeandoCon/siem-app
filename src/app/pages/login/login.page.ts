import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { UserService } from "../../api/user.service";
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  email: string;
  password: string;

  constructor(public userService: UserService,public router: Router) {}

  
  login() {
    const user = { email: this.email, password: this.password };
    this.userService.login(user).subscribe(data => {
      this.userService.setToken(data.token);
      this.router.navigateByUrl('/');
    });
  }
}
