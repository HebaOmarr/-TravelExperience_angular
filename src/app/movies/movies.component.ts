import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TruncatePipe } from '../pipes/truncate.pipe';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [NgForOf, FormsModule, RouterModule, NgIf, TruncatePipe],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})
export class MoviesComponent implements OnInit {
  allMovies: any[] = [];
  filteredMovies: any[] = [];
  currentPage = 1;
  totalPages = 1;
  currentSearchTerm = '';
  inputPage: number = 1;
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadWishesFromStorage();
    this.loadMovies();

    this.dataService.searchTerm$.subscribe((term) => {
      this.currentSearchTerm = term;
      this.currentPage = 1;
      this.inputPage = 1;
      this.applySearch(term, 1);
    });
  }

  applySearch(term: string, page: number): void {
    if (!term.trim()) {
      this.loadMovies();
      return;
    }

    this.dataService.searchMovies(term, page).subscribe((res: any) => {
      this.filteredMovies = res.results;
      this.totalPages = res.total_pages;
    });
  }
  toggleWishlist(movieId: number): void {
    this.dataService.toggleWishlist(movieId);
  }

  isProductWished(movieId: number): boolean {
    return this.dataService.isWished(movieId);
  }

  loadWishesFromStorage(): void {
    const stored = localStorage.getItem('wishedProducts');
    this.dataService['wishlistMap'] = stored ? JSON.parse(stored) : {};
    this.dataService['updateCount']();
  }

  goToFirstPage(): void {
    if (this.currentPage > 1) {
      this.currentPage = 1;
      this.inputPage = 1;
      this.searchOrLoad();
    }
  }
  
  goToLastPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage = this.totalPages;
      this.inputPage = this.totalPages;
      this.searchOrLoad();
    }
  }
  
  
    nextPage(): void {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.inputPage = this.currentPage;
        this.searchOrLoad();
      }
    }
  
    prevPage(): void {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.inputPage = this.currentPage;
        this.searchOrLoad();
      }
    }
  
    getPageNumbers(): number[] {
    const pages = [];
    const start = Math.max(this.currentPage - 2, 1); 
    const end = Math.min(this.currentPage + 2, this.totalPages);
  
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
  
    return pages;
  }
  
  goToPageNumber(page: number): void {
    this.currentPage = page;
    this.inputPage = page;
    this.searchOrLoad();
  }
  
    goToPage(): void {
      if (this.inputPage >= 1 && this.inputPage <= this.totalPages) {
        this.currentPage = this.inputPage;
        this.searchOrLoad();
      }
    }
    loadMovies(): void {
      this.dataService.getMovies(this.currentPage).subscribe((res: any) => {
        this.allMovies = res.results;
        this.totalPages = res.total_pages;
        this.filteredMovies = res.results;
      });
    }
  
    searchOrLoad(): void {
      if (this.currentSearchTerm.trim()) {
        this.applySearch(this.currentSearchTerm, this.currentPage);
      } else {
        this.loadMovies();
      }
    }
  

}
