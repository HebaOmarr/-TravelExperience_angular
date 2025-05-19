import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { AutheraztionService } from '../../Core/Services/autheraztion.service';
import { FormControl, FormGroup, Validators ,  ReactiveFormsModule, AbstractControl} from '@angular/forms';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  imports: [RouterLink,CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnDestroy {
showPassword = false;
showConfirmPassword = false;
registersub!:Subscription;
constructor(private auth:AutheraztionService, private router:Router){}
  ngOnDestroy(): void {
    this.registersub?.unsubscribe();
  }
RegisterForm = new FormGroup({
  firstName: new FormControl(null, Validators.required),
  lastName: new FormControl(null, Validators.required),
  emailAddress: new FormControl(null, [Validators.required, Validators.email]),
  password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
  confirmPassword: new FormControl(null, Validators.required),
  userName: new FormControl(null,[Validators.required, Validators.minLength(6)]),
}, { validators: this.passwordMatchValidator });



submitdata(){
  if(this.RegisterForm.valid){
this.registersub=this.auth.Register(this.RegisterForm.value).subscribe({
  next:(value)=>{
    this.router.navigate(['/login'])
    console.log(value);
  },
  error:(err:HttpErrorResponse) =>{
    console.log(err.message);
  },
});
  }
}

passwordMatchValidator(data:AbstractControl){
  if(data.get("password")?.value==data.get("confirmPassword")?.value)
  {
    return null;
  }
  else{
    return {mismatch:true}
  }

}









togglePassword() {
  this.showPassword = !this.showPassword;
}

toggleConfirmPassword() {
  this.showConfirmPassword = !this.showConfirmPassword;
}


}
