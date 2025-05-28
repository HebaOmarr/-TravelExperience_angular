import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IMovies } from '../models/imovies';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesApiService {

  constructor(private httClient:HttpClient) {}
    getAllMovie(page = 1):Observable<any>{
      return this.httClient.get<IMovies[]>(`https://api.themoviedb.org/3/movie/now_playing?api_key=e9ce51ba37ef3383f67e73f15084ac2a&page=${page}`)
    }
    getMovieById(id: number): Observable<IMovies> {
      return this.httClient.get<IMovies>(
        `https://api.themoviedb.org/3/movie/${id}?api_key=e9ce51ba37ef3383f67e73f15084ac2a`
      );
    }
    getTvById(id: number): Observable<any> {
      return this.httClient.get<any>(
        `https://api.themoviedb.org/3/tv/${id}?api_key=e9ce51ba37ef3383f67e73f15084ac2a`
      );
    }
    getRecommendedMovies(movieId: number): Observable<IMovies[]> {
      return this.httClient.get<any>(
        `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=e9ce51ba37ef3383f67e73f15084ac2a`
      ).pipe(
        map(res => res.results)
      );
    }
}
