import { Component, DestroyRef, inject, signal } from '@angular/core';
import { JobListService } from '../../services/joblist.service';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  ResolveFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, map, of, startWith } from 'rxjs';
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
  }

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
  constructor() {
    const jobIdFromRoute = +this.route.snapshot.paramMap.get('id')!;
    this.jobId.set(jobIdFromRoute);
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
};
