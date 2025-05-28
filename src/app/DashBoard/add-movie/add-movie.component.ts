import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MoviesService } from '../../services/movies.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-movie',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './add-movie.component.html',
  styleUrl: './add-movie.component.css'
})
export class AddMovieComponent {

  movieForm: FormGroup;
  isSubmitting = false;

  constructor(private fb: FormBuilder, private movieService: MoviesService) {
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
  }

  AddMovie(): boolean {
    if (this.movieForm.invalid) return false;

    const movie = this.movieForm.value;
    const genresArray = movie.genres.split(',').map((g: string) => g.trim());

    const formattedMovie = {
      ...movie,
      genres: genresArray
    };

    this.movieService.AddMovie(formattedMovie);
    this.isSubmitting = false;
    this.movieForm.reset();
    return true;
  }

  get posterPreview(): string {
    const path = this.movieForm.get('poster_path')?.value;
    return path ? 'https://image.tmdb.org/t/p/w500' + path : '';
  }
}
