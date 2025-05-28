import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
    registerForm : FormGroup = new FormGroup({
      name : new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern(/^[A-Za-z].*/)]),
      email : new FormControl(null, [Validators.required ,Validators.email, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]),
      password : new FormControl(null, [Validators.required, Validators.pattern(/^.{8,}$/)]),
      rePassword : new FormControl(null, [Validators.required]),
      phone : new FormControl(null, [Validators.required, Validators.pattern(/^(002)?01[0125][0-9]{8}$/)])
    }, this.confirmPassword)

    confirmPassword(g : AbstractControl)
    {
      if(g.get('password')?.value === g.get('rePassword')?.value)
      {
        return null;
      }
      else{
        return {mismatch : true};
      }
    }


    private readonly _httpService = inject(AuthService);
    msgErr : string = "";
    msgSuc : boolean = false;
    isLoading : boolean = false;
    private _Router = inject(Router);
    registerSubmit():void
    {
      if(this.registerForm.valid)
      {
        this.isLoading = true;
        this._httpService.setRegisterForm(this.registerForm.value).subscribe({
          next:(res : any)=>{
            console.log(res);
            this.isLoading = false;
            this.msgSuc = true;
            if(res.message == 'success')
            {
              setTimeout(()=>{
                this._Router.navigate(['./login']);
              },1000)
              
            }
           
          },
          error:(err : HttpErrorResponse)=>{
            this.msgErr = err.error.message;
            this.isLoading = false;
            console.log(err)
            
          }
        })
      }
      //console.log(this.registerForm.value)
    }
}
