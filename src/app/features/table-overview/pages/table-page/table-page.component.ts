import { Component, inject } from '@angular/core';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { JobListService } from '../../../jobs/services/joblist.service';

@Component({
  selector: 'app-table-page',
  imports: [TableComponent],
  templateUrl: './table-page.component.html',
  styleUrl: './table-page.component.scss',
})
export class TablePageComponent {
  // tableHeaderArr!: string[];
  // tableHeader = signal<string[]>(this.tableHeaderArr);
  private jobService = inject(JobListService);
  parentObsData$ = this.jobService.loadedObservable(
    this.jobService.getJobList()
  );
}
