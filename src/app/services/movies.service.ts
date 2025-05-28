import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private readonly _HttpClient = inject(HttpClient);

  getMovies(): Observable<any> {
    return this._HttpClient.get<any>('https://api.themoviedb.org/3/movie/now_playing?api_key=e9ce51ba37ef3383f67e73f15084ac2a');
  }

  getTvPopular(page = 1): Observable<any> {
    return this._HttpClient.get<any>(`https://api.themoviedb.org/3/tv/popular?api_key=e9ce51ba37ef3383f67e73f15084ac2a&page=${page}`)
  }

  getTvTop(): Observable<any> {
    return this._HttpClient.get<any>('https://api.themoviedb.org/3/tv/top_rated?api_key=e9ce51ba37ef3383f67e73f15084ac2a')
  }

  private apiKey = 'e9ce51ba37ef3383f67e73f15084ac2a';
  private baseUrl = 'https://api.themoviedb.org/3';

  getMovieDetails(id: number, language: string = 'en-US'): Observable<any> {
    const url = `${this.baseUrl}/movie/${id}?api_key=${this.apiKey}&language=${language}`;
    return this._HttpClient.get(url);
  }


  AddMovie(movie: any): boolean {
    const movies = JSON.parse(localStorage.getItem('Movies') || '[]');
    movies.push(movie);
    localStorage.setItem('Movies', JSON.stringify(movies));
    return true;
  }

  UpdateMovie(id: number, updatedMovie: any): boolean {
    const movies = JSON.parse(localStorage.getItem('Movies') || '[]');
    const index = movies.findIndex((movie: any) => movie.id === id);

    if (index === -1) return false;

    updatedMovie.id = id;
    movies[index] = updatedMovie;

    localStorage.setItem('Movies', JSON.stringify(movies));
    return true;
  }

}
