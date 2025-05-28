import { Component, OnInit } from '@angular/core';
import { MovieCardComponent } from "../movie-card/movie-card.component";
import { NgForOf, NgIf } from '@angular/common';
import { IMovies } from '../models/imovies';
import { MoviesApiService } from '../services/movies-api.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movie-container',
  standalone: true,
  imports: [MovieCardComponent, NgIf, NgForOf,RouterLink],
  templateUrl: './movie-container.component.html',
  styleUrl: './movie-container.component.css'
})
export class MovieContainerComponent implements OnInit {
  movies: IMovies[] = [];
  isLoadinglist: boolean = true;
  currentPage = 1;
  totalPages = 1;
  paginationRange: number[] = [];

  

  constructor(private movieApiService: MoviesApiService) {}

  ngOnInit(): void {
    this.fetchMovies(this.currentPage);

  }

  fetchMovies(page: number) {
    this.movieApiService.getAllMovie(page).subscribe((res) => {
      this.movies = res.results;
      this.currentPage = res.page;
      this.totalPages = res.total_pages;
      this.isLoadinglist = false;
      this.updatePagination();
    });
  }

  updatePagination() {
    const range: number[] = [];
    const visiblePages = 5;
    const half = Math.floor(visiblePages / 2);
    let start = Math.max(1, this.currentPage - half);
    let end = Math.min(this.totalPages, start + visiblePages - 1);
  
    if (end - start < visiblePages - 1) {
      start = Math.max(1, end - visiblePages + 1);
    }
  
    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    this.paginationRange = range;
  }
  
  goToPage(page: number) {
    if (page !== this.currentPage) {
      this.fetchMovies(page);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.fetchMovies(this.currentPage + 1);
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.fetchMovies(this.currentPage - 1);
    }
  }
}
