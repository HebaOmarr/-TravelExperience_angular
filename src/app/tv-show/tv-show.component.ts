import { Component, inject, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { NgForOf, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tv-show',
  standalone: true,
  imports: [NgForOf, RouterModule],
  templateUrl: './tv-show.component.html',
  styleUrl: './tv-show.component.css'
})
export class TvShowComponent implements OnInit{

  private readonly _MoivesServices = inject(MoviesService);
  tvPopular : any[] = [];
  currentPage = 1;
  totalPages = 1;
  paginationRange: number[] = [];
  ngOnInit(): void {
    this.fetchTVShows(this.currentPage);
  }
  fetchTVShows(page: number) {
    this._MoivesServices.getTvPopular(page).subscribe((res) => {
      this.tvPopular = res.results;
      this.currentPage = res.page;
      this.totalPages = res.total_pages;
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
      this.fetchTVShows(page);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.fetchTVShows(this.currentPage + 1);
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.fetchTVShows(this.currentPage - 1);
    }
  }
}
