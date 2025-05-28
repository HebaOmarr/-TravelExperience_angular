import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.css'
})
export class NavBlankComponent {
  readonly _Auth = inject(AuthService);
  name : string = localStorage.getItem("username")!;
  
  constructor ( private dataService: DataService ) { }
  wishlistCount: number = 0;
  ngOnInit() {
      this.dataService.wishlistCount$.subscribe(count => {
      this.wishlistCount = count;
    });
  }

  
}
