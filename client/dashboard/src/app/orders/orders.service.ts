import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Order } from '../interfaces/order';
@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  search = {
    status: '',
    userId: '',
    dates: ''
  };
  searchOrders = new Subject<Order[]>();
  subjectOrder = new Subject<Order>();
  order: Order;
  searchOrderResults: Order[];
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
  setSearch(status, userId, dates) {
    this.search.status = status;
    this.search.userId = userId;
    this.search.dates = dates;
  }
  getSearchValues() { return this.search; }


  searchOrder(form): Observable<any>  {
    console.log(form);
    return this.http.post('http://localhost:5000/api/order/searchOrders', form);
  }
  SetSearchResults(orderResults) {
   console.log(orderResults);
   this.searchOrderResults = orderResults;
   this.searchOrders.next(this.searchOrderResults);
   
  }
}
