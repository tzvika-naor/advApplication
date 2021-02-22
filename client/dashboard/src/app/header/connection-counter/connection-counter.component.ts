import { Component, OnInit } from '@angular/core';
import { RealtimeService } from 'src/app/realtime.service';

@Component({
  selector: 'app-connection-counter',
  templateUrl: './connection-counter.component.html',
  styleUrls: ['./connection-counter.component.css']
})
export class ConnectionCounterComponent implements OnInit {
  usersCounter = 0;

  constructor(private realtimeService: RealtimeService) {
    this.realtimeService.currentUsersCounter.subscribe(counter => this.usersCounter = counter);
  }

  ngOnInit(): void {
  }

}
