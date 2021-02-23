import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  delete = false;
  login = true;

  private btnLogin = 'Login';
  private toggleLink = 'Forgot Password?';
  form = {
    email: '',
    password: ''
  };
  constructor(private ls: LoginService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  deleteUser() {

  }
  resetCredentials() {

  }
  toggle() {

    console.log(this.delete);
    this.login = !this.login;
    console.log(this.login);
    if (!this.login) {
      this.btnLogin = 'Reset';
      this.toggleLink = 'Login?';
    }
    else {
      this.btnLogin = 'Login';
      this.toggleLink = 'Forgot Password?';
    }
  }
  onSubmit(formData) {
    if (this.login) {
      this.ls.onLogin(formData.form.value).subscribe(
        (res: any) => {
          console.log(res);

          localStorage.setItem('token', res.sessionToken);

          localStorage.setItem('user', JSON.stringify(res.user));

         // this.ls.setToken(res.sessionToken);
          // this.ls.setIsLogin(true);

          this.ls.setIsLogin(true, res.user);

          this.router.navigate(['/'], { relativeTo: this.route });
          
        }, (error: any) => {
          console.log(error);
          alert('email and password did not match');
        });
    }
    else if (!this.login && !this.delete) {
      this.ls.onUpdate(formData.form.value).subscribe(
        (res: any) => alert('Your password is updated'),
        (error: any) => {
          console.log(error);
          alert('email and password did not match');
        }
      );
    }
  }
}
