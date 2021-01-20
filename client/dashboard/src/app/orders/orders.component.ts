import { Component, OnInit } from '@angular/core';
import { OrdersService } from './orders.service';
import { Order } from '../interfaces/order';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: Order[];
  constructor(private ordersService: OrdersService) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(): void {
    this.ordersService.getAllOrders().subscribe(
      (response:any) => {
        console.log(response);
        this.orders = response.orders;
        console.log(this.orders)
      });

  }
}
