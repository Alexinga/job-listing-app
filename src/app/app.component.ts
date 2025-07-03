import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GlobalMessagesComponent } from './shared/components/global-message/global-message.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GlobalMessagesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'joblisting-app';
}
