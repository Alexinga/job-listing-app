import { Component, inject } from '@angular/core';
import { ToastService } from '../../service/toast.service';
import { NgbToast } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-toast',
  imports: [NgbToast],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
})
export class ToastComponent {
  readonly toastService = inject(ToastService);
}
