import { Component } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-content-layout',
  imports: [NavComponent, FooterComponent, RouterOutlet],
  templateUrl: './content-layout.component.html',
  styleUrl: './content-layout.component.scss',
})
export class ContentLayoutComponent {}
