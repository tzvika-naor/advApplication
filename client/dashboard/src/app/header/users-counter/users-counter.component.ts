import { Component, OnInit } from '@angular/core';
import { RealtimeService } from 'src/app/realtime.service';

@Component({
  selector: 'app-users-counter',
  templateUrl: './users-counter.component.html',
  styleUrls: ['./users-counter.component.css']
})
export class UsersCounterComponent implements OnInit {

  constructor(private realimeService: RealtimeService) { }

  ngOnInit(): void {
  }

}
