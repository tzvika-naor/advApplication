import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { User } from '../interfaces/user';
import { filter } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  users: User[];
  filteredUsers: Subject<User[]> = new Subject<User[]>();
  
  constructor(private http: HttpClient) { 
    this.getAllUsers().subscribe(
      {next: (response: any) => {
        (this.users = response.user);
       (this.filteredUsers.next(response.user)) },
        error: (error) => console.log(error)});
  }

  filterUsers( filters: Partial<User>){
    let tempFilter=this.users.filter((user)=>{
      let flag = true;
      Object.keys(filters).forEach((key)=>{
        if(!(user[key].toLowerCase().includes(filters[key].toLowerCase())))
          return flag = false;
      });
      
        return flag;
        
    });
    this.filteredUsers.next(tempFilter);

  }

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
