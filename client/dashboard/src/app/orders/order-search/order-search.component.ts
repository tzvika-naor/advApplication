import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/interfaces/order';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-order-search',
  templateUrl: './order-search.component.html',
  styleUrls: ['./order-search.component.css']
})
export class OrderSearchComponent implements OnInit {
  fetchOrders: Order[];
  search: any;
  orderForm = {
    userId: '',
    status: '',
    from_date: '',
    to_date: ''
  };

  constructor(private orderService: OrdersService) { }

  ngOnInit(): void {
    this.search = this.orderService.getSearchValues();
    console.log(this.search);
  }
  onSubmit(formData) {
    console.log(formData.form.value);
    this.orderService.searchOrder(formData.form.value).subscribe(response => {
      // console.log(response)
      // this.fetchOrders = response.order;
      console.log(this.fetchOrders);
      this.orderService.SetSearchResults(response.order);
    });
  }
}
