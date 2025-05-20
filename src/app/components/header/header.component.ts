import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AutheraztionService } from '../../Core/Services/autheraztion.service';
import { IUserData } from '../../Core/Interface/IUserData';

@Component({
  selector: 'app-header',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  
 user: IUserData | null = null;

  constructor(public aut: AutheraztionService) {}

  ngOnInit(): void {
    this.aut.user$.subscribe((userData) => {
      this.user = userData;
    });
  }

  logout() {
    this.aut.Logout();
  }
}
