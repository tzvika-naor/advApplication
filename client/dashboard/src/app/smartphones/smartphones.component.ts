import { Component, OnInit } from '@angular/core';
import { Smartphone } from '../interfaces/smartphone';
import { SmartphonesService } from './smartphones.service';
@Component({
  selector: 'app-smartphones',
  templateUrl: './smartphones.component.html',
  styleUrls: ['./smartphones.component.css']
})
export class SmartphonesComponent implements OnInit {
  smartphones: Smartphone[];
  constructor(private smartphonesService: SmartphonesService) { }

  ngOnInit(): void {
    this.getSmartphones();
  }
  getSmartphones(): void {
    this.smartphonesService.getAllSmartphones().subscribe(
      (response: any) => {
        this.smartphones = response.smartphones;
        console.log(this.smartphones);
      }
    );
  }
}
