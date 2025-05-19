import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../Environment/environment';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AutheraztionService {
  UserData: any = null;

  constructor(private http: HttpClient,private router:Router) {}
  Register(data: any): Observable<any> {
    return this.http.post<any>(baseUrl + '/api/Account/register', data);
  }
  Login(data: any): Observable<any> {
    return this.http.post<any>(baseUrl + '/api/Account/login', data);
  }

  saveData() {
    if (localStorage.getItem('Token') !== null) {
      this.UserData = jwtDecode(localStorage.getItem('Token')!);
      console.log(this.UserData);
    }
  }

  Logout(){
    localStorage.removeItem('Token');
    this.UserData=null;
    this.router.navigate(['/home']);
  }
  isLoggedIn(): boolean {
  return !!localStorage.getItem('Token'); 
}
}
