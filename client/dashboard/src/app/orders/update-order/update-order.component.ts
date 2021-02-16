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
  smartphoneId: SmartphoneId;
  smartphoneId1: SmartphoneId;

  constructor(private ordersService: OrdersService) { }

  ngOnInit(): void {
    console.log('hiiii');
    // this.ordersService.subjectOrder.subscribe((order: Order) => {
    //   console.log(order);
    //   this.order = order;
      // order.smartphones.map((smartphone, i) => {
      //   console.log(smartphone);
      //   this.smartphoneId.id = smartphone[i].id._id;
      //   this.smartphoneId.quantity = smartphone[i].quantity;
      // });
    // });
    console.log(this.ordersService.getOrder());
  }

}
