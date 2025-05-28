import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieDataService {

  private movieSource = new BehaviorSubject<any>(null); 
  currentMovie = this.movieSource.asObservable();

  constructor() {}


  changeMovie(movie: any) {
    this.movieSource.next(movie);
  }
}
