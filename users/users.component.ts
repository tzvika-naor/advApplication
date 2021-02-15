import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { User } from '../interfaces/user';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[];


  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.getUsers();
  }
  getUsers() {
    this.usersService.getAllUsers().subscribe(
      (response: any) => {
        this.users = response.user;
      }
    );
  }

}
