import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { messagesService } from '../../service/messages.service';

@Component({
  selector: 'app-global-messages',
  imports: [],
  templateUrl: './global-message.component.html',
  styleUrl: './global-message.component.scss',
})
export class GlobalMessagesComponent {
  private toastService = inject(messagesService);
  @ViewChild('notifyToast', { static: true }) toastElement!: ElementRef;

  ngAfterViewInit() {
    this.toastService.init(this.toastElement.nativeElement);
  }

  hideToast() {
    this.toastService.hide();
  }
}
