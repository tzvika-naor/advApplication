import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UsersService } from '../users.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  user$: any;
  userId: string;
  isParam: string;
  selectedId: any;
  user: User = {
    _id: '',
    isAdmin: false,
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    phone: ''
  };
  constructor(private usersService: UsersService, private route: ActivatedRoute, private router: Router ) { }

  ngOnInit(): void {
    this.isParam = this.route.snapshot.paramMap.get('id');
    if (this.isParam) {
      this.getUser();
    }
  }

  onSubmit(formData): void {
    if (this.isParam) {
      formData.form.value.id = this.userId;
      this.usersService.updateUser(formData.form.value).subscribe(res => {
        console.log(res);
      });
    } else {
      console.log(formData.form.value);
      this.usersService.createNewUser(formData.form.value).subscribe(res => {
        console.log(res);
      });
    }
    this.router.navigate(['/users/delete'], {relativeTo: this.route});
  }
  getUser() {
    this.user$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return this.usersService.getUser(params.get('id'));
      }));
    this.user$.subscribe(res => {
      console.log(res.user);
      this.user = res.user;
      this.userId = res.user._id;
    });
  }
}
