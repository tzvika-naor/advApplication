import { Component, OnInit } from '@angular/core';
import { RealtimeService } from 'src/app/realtime.service';

@Component({
  selector: 'app-users-counter',
  templateUrl: './users-counter.component.html',
  styleUrls: ['./users-counter.component.css']
})
export class UsersCounterComponent implements OnInit {
  usersCounter = 0;

  constructor(private realtimeService: RealtimeService) {
    this.realtimeService.currentUsersCounter.subscribe(counter => this.usersCounter = counter);
  }

  ngOnInit(): void {
  }

}
