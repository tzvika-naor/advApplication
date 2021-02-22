import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Smartphone } from '../interfaces/smartphones';
import { SmartphonesService } from './smartphones.service';
@Component({
  selector: 'app-smartphones',
  templateUrl: './smartphones.component.html',
  styleUrls: ['./smartphones.component.css']
})
export class SmartphonesComponent implements OnInit {
  showChildrens = false;
  smartphones: Smartphone[];
  constructor(private smartphonesService: SmartphonesService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    
    this.smartphonesService.getAllSmartphones();
    this.smartphonesService.showchildren.subscribe(showChildrens => this.showChildrens = showChildrens);
    this.smartphonesService.subject.subscribe((res: any) => {
      this.smartphones = res;
    });
  }

  removeSmartphone(id) {
    this.smartphonesService.removeSmartphone(id).subscribe(res => console.log(res), error => console.log(error));
    this.smartphonesService.getAllSmartphones();
  }
  updateSmartphone(id: string , smartphone: Smartphone) {
    this.smartphonesService.editSmartphone(smartphone);
    this.showChildrens = true;
    this.router.navigate(['update/' + id], { relativeTo: this.route });

  }
  createSmartphone() {
    this.showChildrens = true;
  }
}
