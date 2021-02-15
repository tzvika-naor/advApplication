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
  show: boolean = false;
  status: string[];
  userId: string[];
  dates: string[];
  constructor(private ordersService: OrdersService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.ordersService.searchOrders.subscribe((response: any) => {
      console.log(response);
      this.status = response.status;
      this.userId = response.userId;
      this.dates = response.dates;
      this.orders = response.orders;
      this.results = (response.orders).length;
    });
    this.getOrders();
  }

  getOrders(): void {
    this.ordersService.getAllOrders().subscribe(
      (response: any) => {
        console.log(response);
        this.status = response.status;
        this.userId = response.userId;
        this.dates = response.dates;
        this.orders = response.orders;
        this.results = (response.orders).length;

        this.ordersService.setSearch(this.status, this.userId, this.dates);
      });
  }

  // update
  updateOrder(order) {
    this.ordersService.currentOrder(order);
    this.show = true;
    console.log(this.show)
  
  }
  // delete
  deleteOrder(orderId) {
    this.ordersService.deleteOrder(orderId).subscribe(response => {
      this.router.navigate(['/'], { relativeTo: this.route });
    });
  }

}
