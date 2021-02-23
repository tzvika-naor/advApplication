import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';
import { LoginService } from '../login/login.service';
import { UsersService } from '../users/users.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  loggedUser: User;
  hidden = true;
  constructor(private router: Router, private login: LoginService) { }

  ngOnInit(): void {
    this.loggedUser = this.login.getConnectedUser();
    console.log(this.loggedUser);
  }
  toggle() {
    this.hidden = !this.hidden;
    console.log(this.hidden);
  }
}
