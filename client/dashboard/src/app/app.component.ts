import { Component } from '@angular/core';
import { LoginService } from './login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private show = false;
  constructor(private ls: LoginService) {
    // if (localStorage.getItem('token')) {
      // this.show = true;
    // }
    this.ls.isLogin.subscribe(val => this.show = val);
  }
}
