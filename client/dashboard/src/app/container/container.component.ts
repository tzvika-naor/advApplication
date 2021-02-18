import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {
  private isLogin: boolean;
  constructor(private ls: LoginService) { }

  ngOnInit(): void {
    if (localStorage.getItem('token')){
      this.isLogin = true;
      this.ls.setIsLogin(true);
    }
    this.ls.isLogin.subscribe(res => this.isLogin = res);
  }
  logout() {
    this.isLogin = false;
    localStorage.removeItem('token');
    this.ls.setIsLogin(false);
  }
}
