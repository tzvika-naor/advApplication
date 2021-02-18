import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private token = '';
  public isLogin = new BehaviorSubject(false);

  constructor(private http: HttpClient) { }
  error;
  onLogin(data) {
    console.log(data);
    return this.http.post('http://localhost:5000/api/user/adminLogin', data);
  }
  onUpdate(data) {
    return this.http.put('http://localhost:5000/api/user/updateAdmin', data);
  }
  setIsLogin(data) {
    this.isLogin.next(data);
    if (data === false) {
      localStorage.removeItem('token');
    }
  }
  setToken(token) {
    this.token = token;
  }
}
