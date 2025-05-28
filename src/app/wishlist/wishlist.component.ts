import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { RouterModule } from '@angular/router';
import { TruncatePipe } from '../pipes/truncate.pipe';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule,  RouterModule, TruncatePipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent {
  item: string = "";
  movies: any[] = [];

  constructor (private dataService: DataService) { }

  ngOnInit() {
    const ids = this.dataService.getWishedMovies();
    ids.forEach(id => {
      this.dataService.getMovieById(id).subscribe({
        next: (data) => {
          this.movies.push(data);
        },
        error: (err) => console.error('Failed to load movie:', err)
      });
    });
  }

  deleteMovie(index: number) {
    const movie = this.movies[index];
    this.dataService.toggleWishlist(movie.id);

    this.movies.splice(index, 1);
    Swal.fire("Deleted!", "Your movie has been deleted.", "success");
  }
}
