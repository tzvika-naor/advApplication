import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/interfaces/order';
import { SmartphoneId } from 'src/app/interfaces/smartphoneId';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-update-order',
  templateUrl: './update-order.component.html',
  styleUrls: ['./update-order.component.css']
})
export class UpdateOrderComponent implements OnInit {
  order: Order;
  orderId: any;
  orderDetails: any[];

  constructor(private ordersService: OrdersService) { }

  ngOnInit(): void {
    this.orderId = this.ordersService.getOrder();

    (this.orderId.smartphones).map((item, i) => {

    });
  }

}
