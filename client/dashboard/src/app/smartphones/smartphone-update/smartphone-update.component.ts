import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Smartphone } from 'src/app/interfaces/smartphones';
import { SmartphonesService } from '../smartphones.service';

@Component({
  selector: 'app-smartphone-update',
  templateUrl: './smartphone-update.component.html',
  styleUrls: ['./smartphone-update.component.css']
})
export class SmartphoneUpdateComponent implements OnInit {

  // form: any;

  form: Smartphone = {
    phoneModel: 'blabla',
    brand: '',
    display: '',
    processor: '',
    batteryCapacity: '',
    frontCamera: '',
    rearCamera: '',
    image: '',
    price: 0
  };
  constructor(private ss: SmartphonesService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.ss.subject.subscribe((smartphone: any) => {
      this.form.brand = smartphone.brand;
    },
      error => {
        console.log(error);
      });
  }
  onSubmit(formData) {
    const data = formData.form.value;
    const id = this.route.snapshot.paramMap.get('id');
    if (id){
    this.ss.updateSmartphone(data, id).subscribe(res => console.log(res), err => console.log(err));
  }
  else{
    this.ss.addSmartphone(data).subscribe(res => console.log(res), err => console.log(err));
  }
}
}
