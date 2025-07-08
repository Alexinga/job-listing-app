import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GlobalMessagesComponent } from './shared/components/global-message/global-message.component';
import { ToastComponent } from './shared/components/toast/toast.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GlobalMessagesComponent, ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'joblisting-app';
}
