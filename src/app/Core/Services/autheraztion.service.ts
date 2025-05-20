import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { baseUrl } from '../Environment/environment';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { IUserData } from '../Interface/IUserData';

@Injectable({
  providedIn: 'root',
})
export class AutheraztionService {
  UserData: any = null;
   private userSubject = new BehaviorSubject<IUserData | null>(this.getUserInfoFromToken());
  public user$ = this.userSubject.asObservable();
  
USerAutherizeData:IUserData={
  ID:0,
  UserName:'',
  Role:'User'
};
  constructor(private http: HttpClient, private router: Router) {}
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

  Logout() {
    localStorage.removeItem('Token');
    this.UserData = null;
        this.userSubject.next(null); 

    this.router.navigate(['/home']);
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('Token');
  }

  //-------------
   updateUserDataFromToken() {
    const user = this.getUserInfoFromToken();
    this.userSubject.next(user);
  }

  parseJwt(token: string): any {
    if (!token) return null;
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    return JSON.parse(jsonPayload);
  }

  getUserInfoFromToken(): IUserData | null {
    const token = localStorage.getItem('Token');
    if (!token) return null;

    const decoded = this.parseJwt(token);
    return {
      ID: +decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'],
      UserName: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
      Role: decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'],
    };
  }
}
