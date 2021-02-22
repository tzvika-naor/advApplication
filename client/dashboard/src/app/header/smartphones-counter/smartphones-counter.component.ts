import { Component, OnInit } from '@angular/core';
import { RealtimeService } from 'src/app/realtime.service';
import { SmartphonesService } from 'src/app/smartphones/smartphones.service';
@Component({
  selector: 'app-smartphones-counter',
  templateUrl: './smartphones-counter.component.html',
  styleUrls: ['./smartphones-counter.component.css']
})
export class SmartphonesCounterComponent implements OnInit {

  smartphonesCounter: number;
  onFirstLoad = true;

  constructor(private realtimeService: RealtimeService, private smartphonesService: SmartphonesService) {
    if (this.onFirstLoad) {
      this.smartphonesService.getSmartphonesCount().subscribe(
        (response: any) => {
          console.log('this is response via Rest Api', response);
          this.smartphonesCounter = response.smartphonesCount;
          this.onFirstLoad = false;
        }
      );
    }
    this.realtimeService.currentSmartphonesCounter.subscribe((counter: any) => {
      console.log('this is response via webSocket', counter);
      this.smartphonesCounter = counter;
      // this.smartphonesService.getAllSmartphones();
    });
  }
  ngOnInit(): void {
  }

}
