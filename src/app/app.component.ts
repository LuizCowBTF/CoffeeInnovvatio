import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';

@Component({
  selector: 'app-root',
  styles: [],
  template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
    <app-footer></app-footer>
    `,
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent]
})
export class AppComponent {
  title = 'Coffee Shop Innovvatio';
}
