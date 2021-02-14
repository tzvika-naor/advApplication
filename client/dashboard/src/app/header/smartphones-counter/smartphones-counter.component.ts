import { Component, OnInit } from '@angular/core';
import { RealtimeService } from 'src/app/realtime.service';

@Component({
  selector: 'app-smartphones-counter',
  templateUrl: './smartphones-counter.component.html',
  styleUrls: ['./smartphones-counter.component.css']
})
export class SmartphonesCounterComponent implements OnInit {

  constructor(private realimeService: RealtimeService) { }

  ngOnInit(): void {
  }

}
