
import { Injectable } from '@angular/core';
import { Order } from '../interfaces/order';
import { OrdersService } from '../orders/orders.service';

@Injectable({
  providedIn: 'root'
})
export class D3Service {
  orders: Order[];
  orderByMonth: any[];
  days = [ "1", "2", "3", "4", "5", "6", 
           "7", "8", "9", "10", "11", "12","13" ];


  constructor(private ordersService: OrdersService) { }
  
  generateOrdersGraph(){

    this.ordersService.getAllOrders().subscribe(
      (response: any) => {
        this.orders=response.orders;
          for (let i=1;i<32;i++){
            const currentDay =this.orders.filter((item: Order)=>{
              return item.date.getDay()==i;
            })
            this.orderByMonth.push({day: this.days[i-1],count: currentDay.length})
          }
        
      }
    )
  } 
 
}
