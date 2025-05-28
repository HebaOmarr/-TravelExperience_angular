import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule , ReactiveFormsModule, NgClass],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm : FormGroup = new FormGroup({
    email : new FormControl(null, [Validators.required ,Validators.email,   ]),
    password : new FormControl(null, [Validators.required, Validators.pattern(/^.{8,}$/)]),
  })

  private readonly _httpService = inject(AuthService);
  private readonly _Router = inject(Router);

  msgErr : string = "";
  isLoading : boolean = false;
  msgSuc : boolean = false;

  loginSubmit()
  {
    if(this.loginForm.valid)
    {
      this.isLoading = true;
      this._httpService.setLoginForm(this.loginForm.value).subscribe({
        next:(res : any)=>{
          console.log(res);
          this.isLoading = false;
          this.msgSuc = true;
          if(res.message == 'success')
          {
            setTimeout(()=>{
              localStorage.setItem("userToken", res.token);
              localStorage.setItem("username", res.user.name)
              this._httpService.saveUserData()
              this._Router.navigate(['./home']);
            },1000)
            
          }
          console.log("Welcome")
        },
        error:(err : HttpErrorResponse)=>{
          this.msgErr = err.error.message;
          this.isLoading = false;
          console.log(err)
          
        }
      })
    }
  }


  
}
