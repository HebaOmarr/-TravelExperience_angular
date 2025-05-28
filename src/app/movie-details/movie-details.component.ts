import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesApiService } from '../services/movies-api.service';
import { MovieDataService } from '../services/movie-data.service';
import { NgForOf, NgIf } from '@angular/common';
import { RecomantaitionMovieComponent } from "../recomantaition-movie/recomantaition-movie.component";

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [NgForOf, NgIf, RecomantaitionMovieComponent],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent {
  movieId: number = 0;
  movieDetails: any;
  isLoadingDetails: boolean = false; 

  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _MovieApiService: MoviesApiService,
    private movieDataService: MovieDataService,
  ) {}

  ngOnInit(): void {
    this.movieId = this._ActivatedRoute.snapshot.params['id'];
    this.fetchMovieDetails(this.movieId);

   
    this.movieDataService.currentMovie.subscribe((newMovie) => {
      if (newMovie) {
        this.isLoadingDetails = true; 
        this.fetchMovieDetails(newMovie.id);
      }
    });
  }

  fetchMovieDetails(id: number): void {
    this._MovieApiService.getMovieById(id).subscribe({
      next: (response) => {
        this.movieDetails = response;
        this.isLoadingDetails = false; 
      },
      error: (err) => {
        console.error('Error fetching movie details: ', err);
        this.isLoadingDetails = false;
      },
    });
  }
}
