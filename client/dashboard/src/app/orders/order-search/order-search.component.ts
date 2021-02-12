import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-order-search',
  templateUrl: './order-search.component.html',
  styleUrls: ['./order-search.component.css']
})
export class OrderSearchComponent implements OnInit {
  search: any;
  orderForm = {
    userId: '',
    status: '',
    date: ''
  }

  constructor(private orderService: OrdersService) { }

  ngOnInit(): void {
    this.search = this.orderService.getSearchValues();
    console.log(this.search);
  }
  onSubmit(formData) {
    console.log(formData.form.value);
    this.orderService.searchOrder(formData.form.value);
  }
}
