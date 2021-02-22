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
    this.search = this.orderService.getSearchParameters();
  }
  onSubmit(formData) {
    console.log(formData.form);
    this.orderService.searchOrder(formData.form.value).subscribe(response => {
      console.log(response);
      this.orderService.SetSearchResults(response.order);
  
    });
  }
  resetResults() {
    this.orderService.getAllOrders();
  }
  resetFields(){
  this.orderForm = {
    userId: '',
    status: '',
    from_date: '',
    to_date: ''
  };
}
}
