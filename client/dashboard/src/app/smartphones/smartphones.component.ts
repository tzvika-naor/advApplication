import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Smartphone } from '../interfaces/smartphones';
import { SmartphonesService } from './smartphones.service';
@Component({
  selector: 'app-smartphones',
  templateUrl: './smartphones.component.html',
  styleUrls: ['./smartphones.component.css']
})
export class SmartphonesComponent implements OnInit {
  smartphones: Smartphone[];
  private firstLoad = true;
  private showChildrens = false;
  constructor(private sm: SmartphonesService) { }
  private subscriptionName: Subscription;
  ngOnInit(): void {
    if (this.firstLoad) {
      this.getSmartphones();
      this.firstLoad = false;
    }
    this.subscriptionName = this.sm.subject.subscribe((res: any) => {
      this.smartphones = res.smartphones;
      console.log(res);
    });
  }
  getSmartphones(): void {
    this.sm.getAllSmartphones().subscribe(
      (response: any) => {
        console.log(response);
        this.smartphones = response.smartphones;
        console.log(this.smartphones);
      }
    );
  }
  removeSmartphone(id) {
    this.sm.removeSmartphone(id).subscribe(res => console.log(res), error => console.log(error));
  }
  updateSmartphone(smartphone) {
    this.showChildrens = true;
    console.log(smartphone);
    this.sm.smartphoneClicked(smartphone);
  }
  createSmartphone() {
    this.showChildrens = true;
  }
}
