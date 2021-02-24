import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Order } from 'src/app/interfaces/order';
import { SmartphonesId } from 'src/app/interfaces/smartphonesId';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-update-order',
  templateUrl: './update-order.component.html',
  styleUrls: ['./update-order.component.css']
})
export class UpdateOrderComponent implements OnInit {
  order: Order;
  smartphonesId: SmartphonesId;
  smartphonesId1: SmartphonesId;

  constructor(private ordersService: OrdersService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.order = this.ordersService.getOrder();
  }
  removeItem(i) {
    const temp = this.order;
    temp.smartphones.splice(i, 1);
    this.order = temp;
  }
  onSubmit(f) {
    console.log(f);
    console.log(f.form.value);
    let i = 0;
    for (i;i < this.order.smartphones.length;i++) {
      const index = `quantity${i}`;
      this.order.smartphones[i].quantity = f.form.value[index];
    }
    this.order.status = f.form.value.status;
    this.order.date = f.form.value.date;
    console.log(this.order);
    this.ordersService.updateOrder(this.order);
    this.router.navigate(['/orders'], { relativeTo: this.route });
    this.ordersService.getAllOrders(); // we will also get parent show
  }

  onCancel() {
    //navigate out and reload orders
    this.router.navigate(['/orders'], { relativeTo: this.route });
    this.ordersService.getAllOrders();
  }
}
