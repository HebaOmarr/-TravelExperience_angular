import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IPost } from '../../Core/Interface/IPost';
import { StaticPostServiceService } from '../../Core/Services/static-post-service.service';

@Component({
  selector: 'app-post-card',
  imports: [CommonModule, RouterLink],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css'
})

export class PostCardComponent{
  @Input()
  post!: IPost;
  constructor(private postService: StaticPostServiceService) {
  }
}
