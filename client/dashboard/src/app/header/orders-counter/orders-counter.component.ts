import { Component, OnInit } from '@angular/core';
import { RealtimeService } from 'src/app/realtime.service';
import { OrdersService } from 'src/app/orders/orders.service';
@Component({
  selector: 'app-orders-counter',
  templateUrl: './orders-counter.component.html',
  styleUrls: ['./orders-counter.component.css']
})
export class OrdersCounterComponent implements OnInit {
  ordersCounter: number;
  constructor(private realtimeService: RealtimeService, private ordersService: OrdersService) {
    this.ordersService.getOrdersCount().subscribe(
      (response: any) => {
        console.log("Response on angular",response);
        this.ordersCounter = response.ordersCount;
      });
    this.realtimeService.currentOrdersCounter.subscribe(counter => {this.ordersCounter = counter;});
  }
  ngOnInit(): void {
  }

}