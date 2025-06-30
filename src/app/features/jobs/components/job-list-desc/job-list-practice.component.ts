import {
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  signal,
} from '@angular/core';
import { JobListService } from '../../services/joblist.service';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  ResolveFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { JobList } from '../../models/jobList';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, find, map, Observable, of, startWith } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-job-list-desc',
  imports: [SpinnerComponent, AsyncPipe, NgIf],
  templateUrl: './job-list-desc.component.html',
  styleUrl: './job-list-desc.component.scss',
})
export class JobListDescComponent {
  private jobListService = inject(JobListService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  jobId = signal<number | null>(null);
  // selectedJob = signal<JobList | undefined>(undefined);
  // isLoading = signal<boolean>(false);
  // computedAllJobs = computed(() => this.jobListService.loadedJobListData());

  onDeleteJobPost() {
    const jobId = this.jobId();
    if (!jobId) return;
    this.jobListService
      .deleteJobList(jobId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
      });

    // this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  // jobListsss$ = this.jobListService
  //   .getJobList()
  //   .pipe(map((jobs) => ({ ...jobs })));

  // jobList$ = this.jobListService.getJobList().pipe(
  //   map((data) => ({ jobs: data, isLoading: false })),
  //   startWith({ jobs: [], isLoading: true })
  // );
  // selectedJob$ = this.jobListService
  //   .getJobList()
  //   .pipe(map((jobs) => jobs.find((job) => job.id !== this.jobId())));

  jobData$ = this.jobListService.getJobList().pipe(
    map((jobs) => ({
      jobs: jobs.find((job) => job.id === this.jobId()),
      isLoading: false,
      errorMsg: null,
    })),
    startWith({
      jobs: null,
      isLoading: true,
      errorMsg: null,
    }),
    catchError((err: Error) => {
      return of({
        jobs: null,
        isLoading: false,
        errorMsg: err.message,
      });
    })
  );
  // selectedJob = this.jobList$.pipe(map((data) => data.jobs));
  // newSelectJob = this.selectedJob.pipe(
  //   map((data) => {
  //     return data.find((d) => d.id === this.jobId());
  //   })
  // );
  constructor() {
    // console.log(
    //   this.jobListsss$.subscribe({ next: (res) => console.log(res) })
    // );
    // snapshot return values
    // without snapshot it comes back as an observable

    const jobIdFromRoute = +this.route.snapshot.paramMap.get('id')!;
    // down side is that it's not reactive thats where we use effect
    // setting this so its global in this file
    this.jobId.set(jobIdFromRoute);

    // const sub = this.jobListService.getJobList().subscribe({
    //   next: (data) => {
    //     this.jobListService.jobListData.set(data);
    //   },
    // });

    // this.destroyRef.onDestroy(() => sub.unsubscribe());

    // effect(() => {
    //   const allJobs = this.computedAllJobs();
    //   const id = this.jobId();

    //   if (allJobs.length === 0 || !id) {
    //     this.isLoading.set(true);
    //     this.selectedJob.set(undefined);
    //     return;
    //   }

    //   const activeJob = allJobs.find((job) => job.id === id);
    //   this.selectedJob.set(activeJob);
    //   this.isLoading.set(false);
    // });
  }
}

// change the ResolveFn to accept observables
export const resolveJobTitles: ResolveFn<string> = (
  activatedRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot
) => {
  const jobId = +activatedRoute.paramMap.get('id')!;
  const jobListService = inject(JobListService);
  return jobListService.getJobList().pipe(
    map(
      (jobs) => jobs.find((job) => job.id === jobId)?.title || 'Unknown Title'
    ),
    map((titles) => `${titles} Job`)
  );
  // const jobName =
  //   jobListService
  //     .loadedJobListData()
  //     .find((job) => job.id === +activatedRoute.paramMap.get('id')!)?.title ||
  //   'Unknown Job';
  // return `${jobName} Job`;
};
