import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../Environment/environment';

@Injectable({
  providedIn: 'root'
})
export class GovermantateServiceService {

 private apiUrl = `${baseUrl}/api/Governorate`;
  constructor(private http: HttpClient) { }

  createGovermantate(formData: any): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }
  getallGovermantate():Observable<any>{
    return this.http.get(this.apiUrl)
  }
  
  delete(id:number): Observable<any>{
    return this.http.delete(`${this.apiUrl}/${id}`)
  }

  GetGovernmentbyid(id:number): Observable<any>{
    return this.http.get(`${this.apiUrl}/${id}`)
  }
  updateGovernment(body:any,id:number):Observable<any>{
    console.log(body);
    return this.http.put(`${this.apiUrl}/${id}`,body);
  }
}
