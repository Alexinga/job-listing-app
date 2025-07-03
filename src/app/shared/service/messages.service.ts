import { Injectable } from '@angular/core';
import * as bootstrap from 'bootstrap';
@Injectable({ providedIn: 'root' })
export class messagesService {
  private toastEl: HTMLElement | null = null;

  init(toastElement: HTMLElement) {
    this.toastEl = toastElement;
  }

  show(message: string) {
    if (!this.toastEl) {
      console.warn('Toast element not initialized yet.');
      return;
    }

    const body = this.toastEl.querySelector('.toast-body');
    if (body) {
      body.textContent = message;
      const toast = bootstrap.Toast.getOrCreateInstance(this.toastEl);
      toast.show();
    } else {
      console.warn('There was a problem. Toast Element did no initialize');
    }
  }

  hide() {
    if (this.toastEl) {
      const toast = bootstrap.Toast.getOrCreateInstance(this.toastEl);
      toast.hide();
    }
  }
}
