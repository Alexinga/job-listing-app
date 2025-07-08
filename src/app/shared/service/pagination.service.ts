import { computed, Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PaginationService<T> {
  pageSize = signal(3);
  loadedPageSize = this.pageSize.asReadonly();
  pageNum = signal(1);
  loadedPageNum = this.pageNum.asReadonly();

  allData = signal<T[]>([]);
  //   pagedData = signal<T[]>([]);
  pagedData = computed(() => {
    const start = (this.pageNum() - 1) * this.pageSize();
    const end = start + this.pageSize();
    return this.allData().slice(start, end);
  });

  //   updatePagedData() {
  //     const start = (this.pageNum() - 1) * this.pageSize();
  //     const end = start + this.pageSize();
  //     this.pagedData.set(this.allData().slice(start, end));
  //   }
}
