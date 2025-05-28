import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrendingService {

  private apiKey = 'e9ce51ba37ef3383f67e73f15084ac2a';
  private baseUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) {}

  getTrendingContent(language: string = 'en-US'): Observable<any> {
    const url = `${this.baseUrl}/trending/all/day?api_key=${this.apiKey}&language=${language}`;
    return this.http.get(url);
  }
 
}
