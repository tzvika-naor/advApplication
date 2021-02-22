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

  data: Smartphone;
  form: Smartphone;
  constructor(private smartphoneService: SmartphonesService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // this.form = this.smartphoneService.getSmartphone();
    // console.log(this.form);
    this.smartphoneService.showchildren.subscribe((res: Smartphone) =>
    {console.log(res);
     this.form = res;
    });
    console.log(this.form);



    // this.smartphoneService.dataSub.subscribe((res: any) => console.log(res) );
    // this.smartphoneService.subject.subscribe((smartphone: Smartphone) => {
    //   console.log(smartphone);
    //   this.data = smartphone;
    // this.form = this.data;
    // },
    //   error => {
    //     console.log(error);
    //   });
  }
  onSubmit(formData) {
    console.log(formData.form.value);
    const data = formData.form.value;
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.smartphoneService.updateSmartphone(data, id).subscribe(res => console.log(res), err => console.log(err));
    }
    else {
      this.smartphoneService.addSmartphone(data).subscribe(res => console.log(res), err => console.log(err));
    }
    this.smartphoneService.getAllSmartphones();
    this.router.navigate(['/smartphones'], { relativeTo: this.route });

  }
}
