import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tv-toprated',
  standalone: true,
  imports: [],
  templateUrl: './tv-toprated.component.html',
  styleUrl: './tv-toprated.component.css'
})
export class TvTopratedComponent {
  @Input() tvtop !: any;
  private _Router = inject(Router)
  move(){
    this._Router.navigate(['./login'])
  }
}
