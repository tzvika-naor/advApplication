import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Smartphone } from '../interfaces/smartphones';
@Injectable({
  providedIn: 'root'
})
export class SmartphonesService {
  public smartphones: any[];
  public dataSub = new Subject();
  public subject = new Subject();

  constructor(private http: HttpClient) { }

  getAllSmartphones() {
    return this.http.get('http://localhost:5000/api/smartphone');
  }
  getSmartphonesCount() {
    return this.http.get('http://localhost:5000/api/smartphone/count/smartphonesCount');
  }
  removeSmartphone(id) {
    return this.http.delete(`http://localhost:5000/api/smartphone/${id}`);
  }
  smartphoneClicked(smartphone) {
   this.smartphones = smartphone;
   return this.subject.next(this.smartphones);
  }
  updateSmartphone(data, id) {
    return this.http.put(`http://localhost:5000/api/smartphone/${id}`, data);
  }
  addSmartphone(data) {
    console.log(data);
    return this.http.post(`http://localhost:5000/api/smartphone/`, data);
  }
  RenderParent() {
    return this.getAllSmartphones().subscribe((res: any) => {
      console.log(res);
      this.subject.next(res.smartphones);
    });

  }
  
}
