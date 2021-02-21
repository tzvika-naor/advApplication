import { Component, OnInit } from '@angular/core';
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
    this.getOrders();
  }

  getOrders(): void {
    this.ordersService.getAllOrders();
    this.ordersService.subjectOrder.subscribe((res: any) => {
     // they orders!!!
     this.orders = res.orders;
     this.results = res.ordersCount;
    });
  }

  // update
  updateOrder(order) {
    this.ordersService.currentOrder(order);
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
