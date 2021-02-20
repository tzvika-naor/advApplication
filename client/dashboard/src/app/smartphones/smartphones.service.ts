import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Smartphone } from '../interfaces/smartphones';
@Injectable({
  providedIn: 'root'
})
export class SmartphonesService {
  showchildren = new BehaviorSubject(false);
  public smartphones: any;
  public dataSub = new Subject();
  public subject = new Subject();

  constructor(private http: HttpClient) { }

  getAllSmartphones() {
    return this.http.get('http://localhost:5000/api/smartphone').subscribe((res: any) => {
      this.subject.next(res.smartphones);
      this.showchildren.next(false)
    });
  }
  getSmartphonesCount() {
    return this.http.get('http://localhost:5000/api/smartphone/count/smartphonesCount');
  }
  removeSmartphone(id) {
    return this.http.delete(`http://localhost:5000/api/smartphone/${id}`);
  }
  updateSmartphone(data, id) {
    return this.http.put(`http://localhost:5000/api/smartphone/${id}`, data);
  }
  addSmartphone(data) {
    return this.http.post(`http://localhost:5000/api/smartphone/`, data);
  }
}
