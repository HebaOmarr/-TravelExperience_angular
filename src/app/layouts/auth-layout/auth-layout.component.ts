import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../footer/footer.component';
import { NavAuthComponent } from "../../core/nav-auth/nav-auth.component";

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterModule, FooterComponent, NavAuthComponent],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.css'
})
export class AuthLayoutComponent {

}
