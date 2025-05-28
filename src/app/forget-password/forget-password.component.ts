import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule , Router} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, NgClass],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {

  step : number = 1;
  isLoading : boolean = false;
  msgErr : string = "";
  msgSuc : string = "";
  verifyEmail : FormGroup = new FormGroup({
    email : new FormControl(null, [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)])
  })

  verifyCode : FormGroup = new FormGroup({
    resetCode : new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]{6}$/)])
  })

  resetPassword : FormGroup = new FormGroup({
    email : new FormControl(null, [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]),
    newPassword : new FormControl(null, [Validators.required, Validators.pattern(/^\w{6,}$/), Validators.minLength(8)])
  })

  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router)

  verifyEmailSubmit(): void{
    this.isLoading = true;
    this._AuthService.setEmailVerify(this.verifyEmail.value).subscribe({
      next :(res : any)=>{
        console.log(res);
        if(res.statusMsg === 'success'){
          setTimeout(()=>{
            this.step =2;
            this.msgSuc = res.message;
          },1000)
          this.isLoading = false;
          
        }
      },
      error:(err)=>{
        this.isLoading = false;
        this.msgErr = err.error.message;
        console.log(err);
        this.isLoading = false;
      }
    })
  }

  verifyCodeSubmit(): void{
    this.isLoading = true;
    this._AuthService.setCodeVerify(this.verifyCode.value).subscribe({
      next :(res : any)=>{
        console.log(res);
        if(res.status === 'Success'){
          this.step =3;
        }
        this.isLoading= false;
      },
      error:(err)=>{
        console.log(err);
        this.msgErr = err.error.message;
        this.isLoading = false;
        
      }
    })
  }

  resetPasswordSubmit(): void{
    this.isLoading = true;
    this._AuthService.setResetPass(this.resetPassword.value).subscribe({
      next :(res : any)=>{
        console.log(res);
        this.isLoading = false;
        localStorage.setItem('userToken', res.token);
        this._AuthService.saveUserData()
        this._Router.navigate(['/login']);
        
      },
      error:(err)=>{
        console.log(err);
        this.msgErr = err.error.message;
        this.isLoading = false;
        
      }
    })
  }
}
