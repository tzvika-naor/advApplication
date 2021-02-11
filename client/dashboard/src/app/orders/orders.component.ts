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
  orders: Order[];
  show: false;
  constructor(private ordersService: OrdersService, private router: Router,   private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(): void {
    this.ordersService.getAllOrders().subscribe(
      (response: any) => {
        console.log(response);
        this.orders = response.orders;
        console.log(this.orders);
      });
  }

  // update
  updateOrder(order){
    this.ordersService.currentOrder(order);
    this.router.navigate(['update'], { relativeTo: this.route });
    
  }
  // delete
  deleteOrder(orderId){
   this.ordersService.deleteOrder(orderId).subscribe(response => {
    this.router.navigate(['/'], { relativeTo: this.route });
   });
  }
  
}
