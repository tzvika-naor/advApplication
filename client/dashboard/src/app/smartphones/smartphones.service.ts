import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Smartphone} from '../interfaces/smartphone'
@Injectable({
  providedIn: 'root'
})
export class SmartphonesService {

  constructor(private http: HttpClient) {}

  getAllSmartphones() {
    return this.http.get('http://localhost:5000/api/smartphone');
  }
}
