import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  user: User = {
    isAdmin: false,
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    phone: ''
  };
  constructor() { }

  ngOnInit(): void {

  }
  onSubmit(form) {
    console.log(form)
  }
}
