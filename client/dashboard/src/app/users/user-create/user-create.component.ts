import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UsersService } from '../users.service';

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
  constructor(private usersService: UsersService) { }

  ngOnInit(): void {

  }
  onSubmit(formData): void {
    console.log(formData.form.value);
    this.usersService.createNewUser(formData.form.value).subscribe(res => {
      console.log(res);
    });
  }
}
