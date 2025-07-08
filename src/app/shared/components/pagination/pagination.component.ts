import { Component, computed, inject, input, signal } from '@angular/core';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { PaginationService } from '../../service/pagination.service';

@Component({
  selector: 'app-pagination',
  imports: [NgbPagination],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
  // loadedData = input.required<T[]>();
  // displayData = signal<T[]>([]);
  // pageNum = signal(1);
  // pageSize = signal(10);
  private paginationService = inject(PaginationService);
  pageSize = computed(() => this.paginationService.loadedPageSize());
  pageNum = computed(() => this.paginationService.loadedPageNum());
  collection = computed(() => this.paginationService.allData().length);
  // pagedData = this.paginationService.pagedData;

  onPageChange(newPage: number) {
    this.paginationService.pageNum.set(newPage);
    // this.paginationService.updatePagedData();
  }
}
