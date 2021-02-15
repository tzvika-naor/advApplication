import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get('http://localhost:5000/api/user');
  }
  createNewUser(form) {
    return this.http.post('http://localhost:5000/api/user/signup', form);
  }
  deleteUser(userId) {
    return this.http.delete(`http://localhost:5000/api/user/deleteUserByAdmin/${userId}`);
  }
  updateUser(user) {
    console.log(typeof(user));
    return this.http.put(`http://localhost:5000/api/user/updateByUserId`, user);
  }
  getUser(userId) {
    return this.http.get(`http://localhost:5000/api/user/${userId}`);
  }
}
