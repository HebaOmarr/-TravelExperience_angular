import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostCardComponent } from '../Post-Card/post-card.component';
import { IPlace } from '../../Core/Interface/IPlace';
import { IPost } from '../../Core/Interface/IPost';
import { StaticPostServiceService } from '../../Core/Services/static-post-service.service';

@Component({
  selector: 'app-place',
  imports: [CommonModule, PostCardComponent],
  templateUrl: './place.component.html',
  styleUrl: './place.component.css'
})
export class PlaceComponent {
  place!: IPlace;
  postsList!: IPost[];
  page: number = 1;
  pageSize: number = 6;
  isLoadingMore: boolean = false;
  hasMore: boolean = true;

  constructor(private postService: StaticPostServiceService) {
    this.postsList = this.postService.getAllPosts(this.page, this.pageSize);
    this.place = {
      PlaceId: 1,
      PlaceImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
      PlaceName: "Maldives Beach",
      PlaceDescription:"welcome to our city",
      Rate: 4.8
    };
  }

  PostFilter(keyword: string): void {
    if (keyword) {
      this.postsList = this.postService.Filter(keyword);
    } else {
      this.postsList = this.postService.getAllPosts(this.page, this.pageSize);
    }
  }

  LoadMorePosts(): void {
    this.isLoadingMore = true;
    const newPosts = this.postService.getAllPosts(this.page, this.pageSize);
    if (newPosts.length === 0) {
      this.hasMore = false;
    } else {
      this.postsList = [...this.postsList, ...newPosts];
      this.page++;
    }
    this.isLoadingMore = false;
  }
}
