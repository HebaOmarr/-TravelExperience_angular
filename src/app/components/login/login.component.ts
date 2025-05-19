import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { AutheraztionService } from '../../Core/Services/autheraztion.service';
import { FormControl, FormGroup, Validators ,  ReactiveFormsModule, AbstractControl} from '@angular/forms';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [RouterLink,CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnDestroy {

  failedLogin:boolean=false;
  loginsub!:Subscription;
  
constructor(private auth:AutheraztionService, private router:Router){}
  ngOnDestroy(): void {
    this.loginsub?.unsubscribe();
  }
LoginForm = new FormGroup({
  emailAddress: new FormControl(null, [Validators.required, Validators.email]),
  password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
  rememberMe:new FormControl(false),
});



submitdata(){

  if(this.LoginForm.valid){
    console.log(this.LoginForm.value);
this.loginsub=this.auth.Login(this.LoginForm.value).subscribe({
  next:(value)=>{
    localStorage.setItem('Token',value.token);
    this.auth.saveData();
    this.router.navigate(['/home'])
    console.log(value);
  },
  error:(err:HttpErrorResponse) =>{
    this.failedLogin=true;
    console.log(err.message);
        console.log( this.failedLogin);

  },
});
  }
}

showPassword = false;

togglePassword() {
  this.showPassword = !this.showPassword;
}


}
