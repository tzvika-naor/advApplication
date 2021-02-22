import { Component, OnInit } from '@angular/core';
import { RealtimeService } from 'src/app/realtime.service';
import { OrdersService } from 'src/app/orders/orders.service';
import { Order } from 'src/app/interfaces/order';
@Component({
  selector: 'app-orders-counter',
  templateUrl: './orders-counter.component.html',
  styleUrls: ['./orders-counter.component.css']
})
export class OrdersCounterComponent implements OnInit {
  ordersCounter: number;
  onFirstLoad = true;
  constructor(private realtimeService: RealtimeService, private ordersService: OrdersService) {

    if (this.onFirstLoad) {
      this.ordersService.getOrdersCount().subscribe(
        (response: any) => {
          console.log(response);
          console.log('Response on angular', response);
          this.ordersCounter = response.ordersCount;
          this.onFirstLoad = false;
        });
    }
    this.realtimeService.currentOrdersCounter.subscribe(counter => {
      console.log(counter);
      this.ordersCounter = counter;
      // need to rerender orders
      this.ordersService.getAllOrders();
    });
  }
  ngOnInit(): void {
  }

}
