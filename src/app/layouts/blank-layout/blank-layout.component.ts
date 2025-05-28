import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../footer/footer.component';
import { NavBlankComponent } from "../../core/nav-blank/nav-blank.component";

@Component({
  selector: 'app-blank-layout',
  standalone: true,
  imports: [RouterModule, FooterComponent, NavBlankComponent],
  templateUrl: './blank-layout.component.html',
  styleUrl: './blank-layout.component.css'
})
export class BlankLayoutComponent {

}
