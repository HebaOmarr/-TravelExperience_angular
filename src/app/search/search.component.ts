import { Component, inject } from '@angular/core';
import { DataService } from '../services/data.service';
import { MovieItemComponent } from "../movie-item/movie-item.component";
import { MovieListComponent } from "../movie-list/movie-list.component";
import { MoviesComponent } from "../movies/movies.component";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ MoviesComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  private dataService = inject(DataService)
  searchFunc(value: string) {
    const searchTerm = value.trim().toLowerCase();
    this.dataService.setSearchTerm(searchTerm);
  }
}
