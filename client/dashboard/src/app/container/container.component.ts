import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {
  private isLogin: any;
  constructor(private ls: LoginService) { }

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      this.ls.setIsLogin(true, JSON.parse(localStorage.getItem('user')));
    }
    this.ls.isLogin.subscribe(res => this.isLogin = res);
  }
  logout() {
    localStorage.removeItem('user');
    this.ls.setIsLogin(false, null);
  }
}
