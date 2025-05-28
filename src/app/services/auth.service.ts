import { HttpClient } from '@angular/common/http';
import { inject, Injectable} from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _http = inject(HttpClient);

  setRegisterForm(data : object) : Observable<any>
  {
    return this._http.post('https://ecommerce.routemisr.com/api/v1/auth/signup', data)
  }

  setLoginForm(data : object): Observable<any>
  {
    return this._http.post('https://ecommerce.routemisr.com/api/v1/auth/signin', data)
  }

  userData : any = null;
  saveUserData() : void{
    if(localStorage.getItem('userToken') !== null){
      this.userData = jwtDecode(localStorage.getItem("userToken") !)
      console.log(this.userData);
      
    }
  }

  private readonly _Router = inject(Router);

  logout():void
  { 
    localStorage.removeItem("userToken");
    this.userData = null;
    this._Router.navigate(['./login'])
  }

  setEmailVerify(data : object) : Observable<any>{
    return this._http.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', data)
  }

  setCodeVerify(data : object) : Observable<any>{
    return this._http.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', data)
  }

  setResetPass(data : object) : Observable<any>{
    return this._http.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', data)
  }
}
