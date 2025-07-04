import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { headers } from '../../../../environments/environment';
import { JobList, NewJobList } from '../models/jobList';
import { catchError, map, Observable, of, startWith, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class JobListService {
  private http = inject(HttpClient);
  private allJobListURL =
    'https://yonxcfogpkhznygsaugw.supabase.co/rest/v1/jobs';
  // jobListData = signal<JobList[]>([]);
  // loadedJobListData = this.jobListData.asReadonly();

  getJobList() {
    return this.http
      .get<JobList[]>(`${this.allJobListURL}?select=*`, { headers })
      .pipe(
        map((res) => res),
        catchError((error: HttpErrorResponse) => {
          const message =
            error.message || `Error: ${error.status}: ${error.statusText}`;
          return throwError(() => new Error(message));
        })
      );
  }

  postJobList(jobPost: NewJobList) {
    return this.http.post<NewJobList>(this.allJobListURL, jobPost, { headers });
  }

  deleteJobList(id: number) {
    return this.http.delete<JobList>(`${this.allJobListURL}?id=eq.${id}`, {
      headers,
    });
  }

  loadedObservable<T>(obs: Observable<T>) {
    return obs.pipe(
      map((data) => ({ obsData: data, isLoading: false, errorMsg: null })),
      startWith({
        obsData: [] as T,
        isLoading: true,
        errorMsg: null,
      }),
      catchError((err: Error) => {
        return of({
          obsData: [] as T,
          isLoading: true,
          errorMsg: err.message,
        });
      })
    );
  }
}
