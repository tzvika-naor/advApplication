import { Component, Input, OnInit } from '@angular/core';
import { OrdersService } from './orders.service';
import { Order } from '../interfaces/order';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  results: number;
  orders: Order[];
  show = false;
  constructor(private ordersService: OrdersService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.ordersService.getAllOrders();
    this.ordersService.subjectOrder.subscribe((res: any) => {
      this.show = this.ordersService.getShow()
      this.orders = res.orders;
      this.results = res.ordersCount;
    });
  }
  // update
  updateOrder(order) {
    this.ordersService.setSelectedOrder(order);
    this.show = true;
    console.log(this.show);
  }
  // delete
  deleteOrder(orderId) {
    this.ordersService.deleteOrder(orderId).subscribe(response => {
      this.router.navigate(['/orders'], { relativeTo: this.route });
    });
  }

}
