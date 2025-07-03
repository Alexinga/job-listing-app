import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { JobListService } from '../../services/joblist.service';
import { JobListCardComponent } from '../../components/job-list-card/job-list-card.component';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';
import { catchError, map, of, startWith } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-main',
  imports: [JobListCardComponent, SpinnerComponent, AsyncPipe, NgIf],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  // isLoading = signal<boolean>(false);
  // errorCaught = signal<string>('');
  jobListService = inject(JobListService);

  // destroyRef = inject(DestroyRef);
  jobLists$ = this.jobListService.getJobList().pipe(
    map((data) => ({ jobs: data, isLoading: false, errorMsg: null })),
    startWith({ jobs: [], isLoading: true, errorMsg: null }),
    catchError((err: Error) => {
      return of({
        jobs: [],
        isLoading: false,
        errorMsg: err.message,
      });
    })
  );

  // ngOnInit(): void {
  //   this.isLoading.set(true);
  //   const subscribe = this.jobListService.getJobList().subscribe({
  //     next: (jobs) => {
  //       this.jobListService.jobListData.set(jobs);
  //       console.log(jobs);
  //     },
  //     error: (err: Error) => {
  //       this.isLoading.set(false);
  //       this.errorCaught.set(err.message);
  //     },
  //     complete: () => {
  //       this.isLoading.set(false);
  //     },
  //   });

  //   this.destroyRef.onDestroy(() => subscribe.unsubscribe());
  // }

  // get loadedJobs() {
  //   return this.jobListService.loadedJobListData();
  // }
}
