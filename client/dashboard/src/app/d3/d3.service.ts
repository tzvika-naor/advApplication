
import { Injectable } from '@angular/core';
import { Order } from '../interfaces/order';
import { OrdersService } from '../orders/orders.service';

@Injectable({
  providedIn: 'root'
})
export class D3Service {
  orders: Order[];
  orderByMonth: any[];
  months = [ "January", "February", "March", "April", "May", "June", 
           "July", "August", "September", "October", "November", "December" ];


  constructor(private ordersService: OrdersService) { }
  
  generateOrdersGraph(){

    this.ordersService.getAllOrders().subscribe(
      (response: any) => {
        this.orders=response.orders;
          for (let i=1;i<13;i++){
            const currentMonth =this.orders.filter((item: Order)=>{
              return item.date.getMonth()==i;
            })
            this.orderByMonth.push({month: this.months[i-1],count: currentMonth.length})
          }
   
      }
    )
  } 
 
}
