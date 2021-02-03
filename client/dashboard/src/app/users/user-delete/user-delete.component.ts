import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.css']
})
export class UserDeleteComponent implements OnInit {

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
