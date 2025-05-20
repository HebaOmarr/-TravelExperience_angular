import { Component } from '@angular/core';
import { GovermantateServiceService } from '../../../Core/Services/govermantate-service.service';
import { Router, RouterLink } from '@angular/router';
import { IGovernorate } from '../../../Core/Interface/IGovernment';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-show-all-governament',
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './show-all-governament.component.html',
  styleUrl: './show-all-governament.component.css'
})
export class ShowAllGovernamentComponent {

  governmentList!:IGovernorate[];
    FliteredList!:IGovernorate[];
  searchTerm!:string;
  constructor(private govservice: GovermantateServiceService ,private router :Router){
  }
 ngOnInit(): void {
  this.govservice.getallGovermantate().subscribe({
    next:(value)=>{
      this.governmentList=value;
        this.FliteredList=[...this.governmentList];
         console.log(this.governmentList);
    },
    error:(err)=> {
      console.log(err);
    },
  })
 }
 delete(id:number){
this.govservice.delete(id).subscribe({
  next:()=>{
    this.governmentList=this.governmentList.filter(e=>e.id!=id); 
         console.log("delete");
        this.FliteredList=[...this.governmentList];
      this.router.navigate(['/govall']);

  },
    error: err => console.error('Error:', err)

})
 }

 search(){
this.FliteredList=this.governmentList.filter(e=>e.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
 }

}
