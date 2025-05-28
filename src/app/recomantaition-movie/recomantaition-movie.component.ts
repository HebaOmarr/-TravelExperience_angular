import { Component, Input, OnInit } from '@angular/core';
import { MoviesApiService } from '../services/movies-api.service';
import { MovieDataService } from '../services/movie-data.service';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-recomantaition-movie',
  standalone: true,
  imports: [NgIf, NgForOf],
  templateUrl: './recomantaition-movie.component.html',
  styleUrl: './recomantaition-movie.component.css'
})
export class RecomantaitionMovieComponent implements OnInit{
  @Input() movieId!: number;
  recommendedMovies: any[] = [];
  currentMovieInDetails: any | null = null;

  isLoading: boolean = false;
  isPageLoading: boolean = false;

  currentPage: number = 1;
  moviesPerPage: number = 5;

  constructor(private movieService: MoviesApiService, private movieDataService: MovieDataService) {}

  ngOnInit(): void {
    if (this.movieId) {
      this.isLoading = true;
      this.movieService.getRecommendedMovies(this.movieId).subscribe({
        next: (movies) => {
          this.recommendedMovies = movies;
        },
        complete: () => {
          this.isLoading = false;
        }
      });

    
      this.movieDataService.currentMovie.subscribe((newMovie) => {
        this.currentMovieInDetails = newMovie;
      });
    }
  }

  get paginatedMovies(): any[] {
    const startIndex = (this.currentPage - 1) * this.moviesPerPage;
    return this.recommendedMovies.slice(startIndex, startIndex + this.moviesPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.recommendedMovies.length / this.moviesPerPage);
  }

  changePage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.isPageLoading = true;
      this.currentPage = page;

      setTimeout(() => {
        this.isPageLoading = false;
      }, 500);
    }
  }

 
  selectMovie(movie: any) {
    const index = this.recommendedMovies.indexOf(movie);

    if (index !== -1) {
     
      if (this.currentMovieInDetails) {
        this.recommendedMovies[index] = this.currentMovieInDetails;
      } else {
       
        this.recommendedMovies.splice(index, 1);
      }
    }

    
    this.movieDataService.changeMovie(movie);
  }
  goToTopAndSelect(movie: any) {
  window.scrollTo({ top: 80, behavior: 'smooth' });
  this.selectMovie(movie);
}
}
