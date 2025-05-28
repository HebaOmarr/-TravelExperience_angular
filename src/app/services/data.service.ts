import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private wishlistMap: { [id: number]: boolean } = {};
  private wishlistCountSubject = new BehaviorSubject<number>(0);
  wishlistCount$ = this.wishlistCountSubject.asObservable();

  apiKey = "https://api.themoviedb.org/3/movie/now_playing?api_key=e9ce51ba37ef3383f67e73f15084ac2a";
  // apiKey = "https://dummyjson.com/products";

  constructor( private http: HttpClient ) {
    const stored = localStorage.getItem('wishedProducts');
    this.wishlistMap = stored ? JSON.parse(stored) : {};
    this.updateCount();
  }

  see() {
    // console.log('i am from a service as inject');
  }

/******************************************************* */
  getMovies(page: number = 1) {
    return this.http.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=e9ce51ba37ef3383f67e73f15084ac2a&page=${page}`);
  }

  searchMovies(query: string, page: number = 1) {
    return this.http.get(`https://api.themoviedb.org/3/search/movie?api_key=e9ce51ba37ef3383f67e73f15084ac2a&query=${query}&page=${page}`);
  }
/************************************************************** */
toggleWishlist(movieId: number): void {
  this.wishlistMap[movieId] = !this.wishlistMap[movieId];
  localStorage.setItem('wishedProducts', JSON.stringify(this.wishlistMap));
  console.log('i am here from data service toggle');

  this.updateCount();
}
/******************************************************************* */
isWished(productId: number): boolean {
  return this.wishlistMap[productId];
}



private updateCount(): void {
  const count = Object.values(this.wishlistMap).filter(Boolean).length;
  this.wishlistCountSubject.next(count);
}

// these two function for the wish page to display the fav movies inside the wish page by the id of the movie
getWishedMovies(): number[] {
  return Object.entries(this.wishlistMap)
    .filter(([_, isWished]) => isWished)
    .map(([id, _]) => Number(id));
}

getMovieById(id: number) {
  return this.http.get(`https://api.themoviedb.org/3/movie/${id}?api_key=e9ce51ba37ef3383f67e73f15084ac2a`);
}


  private searchTermSubject = new BehaviorSubject<string>('');
  searchTerm$ = this.searchTermSubject.asObservable();
  setSearchTerm(term: string) {
    this.searchTermSubject.next(term);
  }

}
