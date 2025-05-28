import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataService } from '../services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css'
})
export class MovieCardComponent implements OnInit {
  @Input() movie: any;
wished: any;
  getImageUrl(): string {
    return 'https://image.tmdb.org/t/p/w500' + this.movie.poster_path;
  }

  item: string = "";
  movies: any[] = [];

  private dataService = inject(DataService)
 
  ngOnInit() {
    this.loadWishesFromStorage();
    this.dataService.getMovies().subscribe((res: any) => {
      console.log(res);
      // const result = res;
      // console.log(result);
      this.movies = res.results;
      console.log('Results:', this.movies);
    })
  }

  
  toggleWishlist(movieId: number): void {
    const isWished = this.dataService.isWished(movieId);
    this.dataService.toggleWishlist(movieId);
    Swal.fire({
      title: isWished ? 'Removed from Wishlist' : 'Added to Wishlist',
      text: isWished
        ? 'Your movie has been removed.'
        : 'Your movie has been added.',
      icon: isWished ? 'warning' : 'success',
      timer: 1500,
      showConfirmButton: false,
    });
  }


  isProductWished(productId: number): boolean {
    return this.dataService.isWished(productId);
  }

  loadWishesFromStorage(): void {
    const stored = localStorage.getItem('wishedProducts');
    this.dataService['wishlistMap'] = stored ? JSON.parse(stored) : {};
    this.dataService['updateCount']();
  }
}
