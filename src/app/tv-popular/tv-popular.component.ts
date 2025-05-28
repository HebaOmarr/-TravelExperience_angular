import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tv-popular',
  standalone: true,
  imports: [],
  templateUrl: './tv-popular.component.html',
  styleUrl: './tv-popular.component.css'
})
export class TvPopularComponent {

  @Input() tv !:any;
  private _Router = inject(Router)
  move(){
    this._Router.navigate(['./login'])
  }
}
