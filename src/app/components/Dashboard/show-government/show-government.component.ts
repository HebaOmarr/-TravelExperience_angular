import { GovermantateServiceService } from './../../../Core/Services/govermantate-service.service';
import { Component, OnInit } from '@angular/core';
import { IGovernorate } from '../../../Core/Interface/IGovernment';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-show-government',
  imports: [CommonModule],
  templateUrl: './show-government.component.html',
  styleUrl: './show-government.component.css'
})
export class ShowGovernmentComponent implements OnInit {
government!:IGovernorate;
Id!:number;
  constructor(private govserve:GovermantateServiceService,    private activatedRoute: ActivatedRoute,
){}
  ngOnInit(): void {

 this.Id = Number(this.activatedRoute.snapshot.paramMap.get('id') || 0);

  this.govserve.GetGovernmentbyid(this.Id).subscribe({
    next:(value)=>{
this.government=value;
    }
  })

  }
 

  

}
