import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  firstNameSearch = '';
  lastNameSearch = '';
  emailSearch = '';


  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
  }

  onClickSearch(){

    this.usersService.filterUsers({
      firstname: this.firstNameSearch,
      lastname: this.lastNameSearch,
      email: this.emailSearch,
    });
    console.log(this.firstNameSearch);
  }
}
