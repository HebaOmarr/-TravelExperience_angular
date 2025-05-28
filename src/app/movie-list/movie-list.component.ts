import { Component, inject, OnInit } from '@angular/core';
import { BannerComponent } from "../banner/banner.component";
import { MoviesService } from '../services/movies.service';
import { log } from 'node:console';
import { MovieItemComponent } from "../movie-item/movie-item.component";
import { RouterModule } from '@angular/router';
import { TvPopularComponent } from "../tv-popular/tv-popular.component";
import { TvTopratedComponent } from "../tv-toprated/tv-toprated.component";
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TrendingService } from '../services/trending.service';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [BannerComponent, MovieItemComponent, RouterModule, TvPopularComponent, TvTopratedComponent, FormsModule],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})
export class MovieListComponent implements OnInit{

  private readonly _MoivesServices = inject(MoviesService);
  movies: any[] = [];
  tvPopular : any[] = [];
  selectedLanguage = 'en-US';
  private http = inject(HttpClient)
  // onLanguageChange() {
  //   localStorage.setItem('preferredLanguage', this.selectedLanguage);
  //   this.fetchMovies(this.selectedLanguage);
  // }
  fetchMovies(language: string) {
    const apiKey1 = 'e9ce51ba37ef3383f67e73f15084ac2a';
    const url = `https:api.themoviedb.org/3/movie/now_playing?api_key=${apiKey1}&language=${language}`;
    this.http.get(url).subscribe((res : any) => {
      // console.log(res);
      this.movies = res.results;
      console.log(this.movies);
    });
  }
  tvTop : any[] = [];
  ngOnInit(): void {
    const storedLang = localStorage.getItem('preferredLanguage');
    if (storedLang) {
      this.selectedLanguage = storedLang;
    }

  this.fetchMovies(this.selectedLanguage);
    this._MoivesServices.getMovies().subscribe({
      next : (res) =>{
        console.log(res.results);
        this.movies = res.results
      },
      error : (err)=>{
        console.log(err)
      }
    })

    this._MoivesServices.getTvPopular().subscribe({
      next : (res) =>{
        console.log(res.results);
        this.tvPopular = res.results
      },
      error : (err)=>{
        console.log(err)
      }
    })

    this._MoivesServices.getTvTop().subscribe({
      next : (res) =>{
        console.log(res.results);
        this.tvTop = res.results
      },
      error : (err)=>{
        console.log(err)
      }
    })

    this.fetchTrending();
    
  }

  trendingItems: any[] = [];
  
  constructor(private trendingService: TrendingService) {}

  fetchTrending() {
    this.trendingService.getTrendingContent(this.selectedLanguage).subscribe(data => {
      this.trendingItems = data.results;
    });
  }

  onLanguageChange(lang: string) {
    this.selectedLanguage = lang;
    this.fetchTrending();
  }

}
