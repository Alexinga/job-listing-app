import { Component } from '@angular/core';
import { NavComponent } from '../../../layout/nav/nav.component';
import { FooterComponent } from '../../../layout/footer/footer.component';
import { NotFoundContentComponent } from '../../components/not-found-content/not-found-content.component';

@Component({
  selector: 'app-not-found',
  imports: [NavComponent, FooterComponent, NotFoundContentComponent],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
})
export class NotFoundComponent {}
