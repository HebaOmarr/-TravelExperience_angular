import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForOf, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tv-show-details',
  standalone: true,
  imports: [NgIf],
  templateUrl: './tv-show-details.component.html',
  styleUrl: './tv-show-details.component.css'
})
export class TvShowDetailsComponent {
  tvId: string = '';
  tvDetails: any;
  apiKey = 'e9ce51ba37ef3383f67e73f15084ac2a';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.tvId = this.route.snapshot.paramMap.get('id') || '';
    this.fetchTvDetails();
  }

  fetchTvDetails(): void {
    const url = `https://api.themoviedb.org/3/tv/${this.tvId}?api_key=${this.apiKey}`;
    this.http.get(url).subscribe((res) => {
      this.tvDetails = res;
    });
  }
  get genresList(): string {
  return this.tvDetails?.genres?.map((g:any) => g.name).join(', ') || '';
  }
}
