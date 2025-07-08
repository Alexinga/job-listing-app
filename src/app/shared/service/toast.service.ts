import { Injectable, signal } from '@angular/core';
import { ToastInfo } from '../models/toast.model';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private readonly _toast = signal<ToastInfo[]>([]);
  readonly toasts = this._toast.asReadonly();

  show(header: string, body: string) {
    this._toast().push({ header, body });
  }

  close(toast: ToastInfo) {
    this._toast.update((toastValue) => toastValue.filter((t) => t !== toast));
  }
}
