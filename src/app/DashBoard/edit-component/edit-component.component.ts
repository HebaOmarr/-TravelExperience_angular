import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService } from '../../services/movies.service';
import { MoviesApiService } from '../../services/movies-api.service';
import { IMovies } from '../../models/imovies';

@Component({
  selector: 'app-edit-component',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './edit-component.component.html',
  styleUrl: './edit-component.component.css'
})
export class EditComponentComponent implements OnInit {

   
  movieForm: FormGroup;
  movieId: number;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private movieService: MoviesService,
    private router: Router,
    private _MovieApiService: MoviesApiService
  ) {
    this.movieForm = this.fb.group({
      original_title: ['', [Validators.required, Validators.minLength(2)]],
      tagline: [''],
      genres: ['', Validators.required],
      vote_average: [null, [Validators.required, Validators.min(0), Validators.max(10)]],
      vote_count: [null, [Validators.required, Validators.min(0)]],
      popularity: [null, [Validators.required, Validators.min(0)]],
      release_date: ['', Validators.required],
      overview: [''],
      poster_path: ['', Validators.required]
    });

    this.movieId = 0;
  }

  ngOnInit(): void {
    this.movieId = +this.route.snapshot.paramMap.get('id')!;
    this.fetchMovieDetails(this.movieId);
  }

 fetchMovieDetails(id: number): void {
  this._MovieApiService.getMovieById(id).subscribe({
    next: (movie: IMovies & { tagline?: string, genres?: any[], release_date?: string }) => {
      // Extract genre names from genre objects
      const genreNames = movie.genres?.map((g: any) => g.name).join(', ') || '';
      
      this.movieForm.patchValue({
        original_title: movie.original_title,
        tagline: movie.tagline || '',
        genres: genreNames, // Use extracted genre names
        vote_average: movie.vote_average,
        vote_count: movie.vote_count,
        popularity: movie.popularity,
        release_date: movie.release_date || '',
        overview: movie.overview,
        poster_path: movie.poster_path
      });
    },
    error: (err) => {
      console.error('Error fetching movie details: ', err);
    },
  });
}

  UpdateMovie(): void {
    if (this.movieForm.invalid) return;

    const formValue = this.movieForm.value;
    const updatedMovie = {
      ...formValue,
      genres: formValue.genres.split(',').map((g: string) => g.trim())
    };

    this.movieService.UpdateMovie(this.movieId, updatedMovie);
    this.router.navigate(['/movies']);
  }

  get posterPreview(): string {
    const path = this.movieForm.get('poster_path')?.value;
    return path ? 'https://image.tmdb.org/t/p/w500' + path : '';
  }
}
