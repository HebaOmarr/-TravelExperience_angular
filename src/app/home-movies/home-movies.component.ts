import { Component } from '@angular/core';
import { MovieContainerComponent } from "../movie-container/movie-container.component";

@Component({
  selector: 'app-home-movies',
  standalone: true,
  imports: [MovieContainerComponent],
  templateUrl: './home-movies.component.html',
  styleUrl: './home-movies.component.css'
})
export class HomeMoviesComponent {
  
}
