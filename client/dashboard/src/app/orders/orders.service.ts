import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Order } from '../interfaces/order';
@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  subjectOrder = new Subject<Order>();
  order: Order;
  constructor(private http: HttpClient) {
  }

  getAllOrders() {
    return this.http.get('http://localhost:5000/api/order');
  }
  deleteOrder(orderId) {
    return this.http.delete(`http://localhost:5000/api/order/${orderId}`);
  }
  currentOrder(order) {
    this.order = order;
    this.subjectOrder.next(this.order);
  }
  // setOrder(){
  //   return 
  // }
}
