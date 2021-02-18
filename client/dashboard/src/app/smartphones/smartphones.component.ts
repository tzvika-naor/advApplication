import { Component, OnInit } from '@angular/core';
import { Smartphone } from '../interfaces/smartphones';
import { SmartphonesService } from './smartphones.service';
@Component({
  selector: 'app-smartphones',
  templateUrl: './smartphones.component.html',
  styleUrls: ['./smartphones.component.css']
})
export class SmartphonesComponent implements OnInit {
  smartphones: Smartphone[];
  private showChildrens = false;
  constructor(private sm: SmartphonesService) { }

  ngOnInit(): void {
    this.getSmartphones();
  }
  getSmartphones(): void {
    this.sm.getAllSmartphones().subscribe(
      (response: any) => {
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
    this.sm.smartphoneClicked(smartphone);
  }
  createSmartphone(){
    this.showChildrens = true;
  }
}
