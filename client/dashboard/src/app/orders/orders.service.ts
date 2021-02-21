import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Order } from '../interfaces/order';
@Injectable({
  providedIn: 'root'
})
export class OrdersService {

   searchParameters = {
    dates: '',
    status: '',
    userId: ''
  };

  searchOrders = new Subject<Order[]>();
  subjectOrder = new Subject<Order[]>();
  order: Order;
  searchOrderResults: Order[];
  constructor(private http: HttpClient) {
  }

  getAllOrders() {
    return this.http.get('http://localhost:5000/api/order').subscribe((res: any) => {
       this.subjectOrder.next(res);
       this.setSearchParameters(res);
      });
  }

setSearchParameters(res){
  this.searchParameters.dates = res.dates;
  this.searchParameters.status = res.status;
  this.searchParameters.userId = res.userId;
}
getSearchParameters(){
  return this.searchParameters;
}



  getOrdersCount() {
    console.log('Orders count on client');
    return this.http.get('http://localhost:5000/api/order/ordersCount');

  }


  deleteOrder(orderId) {
    return this.http.delete(`http://localhost:5000/api/order/${orderId}`);
  }
  currentOrder(order) {
    this.order = order;
  }

  getOrder() {
    return this.order;
  }

  searchOrder(form): Observable<any> {
    console.log(form);
    return this.http.post('http://localhost:5000/api/order/searchOrders', form);
  }
  SetSearchResults(orderResults) {
    this.subjectOrder.next(orderResults);
  }
}
