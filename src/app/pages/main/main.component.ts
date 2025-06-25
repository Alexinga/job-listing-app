import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { JobListService } from '../../data/service/joblist.service';
import { JobListCardComponent } from '../../modules/job-list-card/job-list-card.component';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';

@Component({
  selector: 'app-main',
  imports: [JobListCardComponent, SpinnerComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit {
  isLoading = signal<boolean>(false);
  errorCaught = signal<string>('');
  jobListService = inject(JobListService);
  destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.isLoading.set(true);
    const subscribe = this.jobListService.getJobList().subscribe({
      next: (jobs) => {
        this.jobListService.jobListData.set(jobs);
        console.log(jobs);
      },
      error: (err: Error) => {
        this.isLoading.set(false);
        this.errorCaught.set(err.message);
      },
      complete: () => {
        this.isLoading.set(false);
      },
    });

    this.destroyRef.onDestroy(() => subscribe.unsubscribe());
  }

  get loadedJobs() {
    return this.jobListService.loadedJobListData();
  }
}
