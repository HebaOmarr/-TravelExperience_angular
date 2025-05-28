import { NgForOf } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-item',
  standalone: true,
  imports: [],
  templateUrl: './movie-item.component.html',
  styleUrl: './movie-item.component.css'
})
export class MovieItemComponent {

  private _Router = inject(Router)
  @Input() movie !:any;

  move(){
    this._Router.navigate(['./login'])
  }
}
