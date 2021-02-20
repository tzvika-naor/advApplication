import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Smartphone } from 'src/app/interfaces/smartphones';
import { SmartphonesService } from '../smartphones.service';

@Component({
  selector: 'app-smartphone-update-create',
  templateUrl: './smartphone-update-create.component.html',
  styleUrls: ['./smartphone-update-create.component.css']
})
export class SmartphoneUpdateCreate implements OnInit {

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
  constructor(private ss: SmartphonesService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    this.ss.subject.subscribe((smartphone: any) => {
      this.form = smartphone;
    },
      error => {
        console.log(error);
      });
  }
  onSubmit(formData) {
    console.log(formData.form.value);
    const data = formData.form.value;
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.ss.updateSmartphone(data, id).subscribe(res => console.log(res), err => console.log(err));
    }
    else {
      this.ss.addSmartphone(data).subscribe(res => console.log(res), err => console.log(err));
    }
    this.ss.RenderParent();
    this.router.navigate(['/smartphones'], { relativeTo: this.route });

  }
}
