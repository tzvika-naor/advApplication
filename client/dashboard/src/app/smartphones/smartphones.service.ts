import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Smartphone } from '../interfaces/smartphones';
@Injectable({
  providedIn: 'root'
})
export class SmartphonesService {
  smartphones: any;
  subject = new Subject<any[]>();

  constructor(private http: HttpClient) { }

  getAllSmartphones() {
    return this.http.get('http://localhost:5000/api/smartphone');
  }
  removeSmartphone(id) {
    return this.http.delete(`http://localhost:5000/api/smartphone/${id}`);
  }
  smartphoneClicked(smartphone) {
    this.subject.next(smartphone);
  }
  updateSmartphone(data, id) {
    console.log(id);
    return this.http.put(`http://localhost:5000/api/smartphone/${id}`, data);
  }
  addSmartphone(data) {
    return this.http.post(`http://localhost:5000/api/smartphone/`, data);
  }
  RenderParent() {
    // return this.getAllSmartphones().subscribe((res: any) => {
    //   console.log(res);
    //   this.smartphones = res;
    //   this.subject.next(res.smartphones);
    // });

  }
}
