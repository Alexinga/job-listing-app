import {
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  signal,
} from '@angular/core';
import { JobListService } from '../../data/service/joblist.service';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  ResolveFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { JobList } from '../../data/schema/jobList';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';

@Component({
  selector: 'app-job-list-desc',
  imports: [SpinnerComponent],
  templateUrl: './job-list-desc.component.html',
  styleUrl: './job-list-desc.component.scss',
})
export class JobListDescComponent {
  private jobListService = inject(JobListService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  jobId = signal<number | null>(null);
  selectedJob = signal<JobList | undefined>(undefined);
  isLoading = signal<boolean>(false);
  computedAllJobs = computed(() => this.jobListService.loadedJobListData());

  onDeleteJobPost() {
    const jobId = this.jobId();
    if (!jobId) return;
    const subscription = this.jobListService.deleteJobList(jobId).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  constructor() {
    // snapshot return values
    // without snapshot it comes back as an observable

    const jobIdFromRoute = +this.route.snapshot.paramMap.get('id')!;
    // down side is that it's not reactive thats where we use effect
    this.jobId.set(jobIdFromRoute);

    const sub = this.jobListService.getJobList().subscribe({
      next: (data) => {
        this.jobListService.jobListData.set(data);
      },
    });

    this.destroyRef.onDestroy(() => sub.unsubscribe());

    effect(() => {
      const allJobs = this.computedAllJobs();
      const id = this.jobId();

      if (allJobs.length === 0 || !id) {
        this.isLoading.set(true);
        this.selectedJob.set(undefined);
        return;
      }

      const activeJob = allJobs.find((job) => job.id === id);
      this.selectedJob.set(activeJob);
      this.isLoading.set(false);
    });
  }
}

export const resolveJobTitles: ResolveFn<string> = (
  activatedRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot
) => {
  const jobListService = inject(JobListService);
  const jobName =
    jobListService
      .loadedJobListData()
      .find((job) => job.id === +activatedRoute.paramMap.get('id')!)?.title ||
    'Unknown Job';
  return `${jobName} Job`;
};
