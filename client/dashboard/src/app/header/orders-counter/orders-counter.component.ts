import { Component, OnInit } from '@angular/core';
import { RealtimeService } from 'src/app/realtime.service';

@Component({
  selector: 'app-orders-counter',
  templateUrl: './orders-counter.component.html',
  styleUrls: ['./orders-counter.component.css']
})
export class OrdersCounterComponent implements OnInit {
  counter: number;
  constructor(private realimeService: RealtimeService) {
    this.realimeService.currentCounter.subscribe(counter => {
      console.log(counter);
      this.counter = counter;
    });
  }
  ngOnInit(): void {
  }

}
