import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { CompanyService } from '../../data/service/company.service';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';
import { CompanyListCardComponent } from '../../modules/company-list-card/company-list-card.component';
import { RouterLink } from '@angular/router';
import { AsyncPipe, NgIf } from '@angular/common';
import {
  BehaviorSubject,
  catchError,
  map,
  of,
  startWith,
  switchMap,
} from 'rxjs';

@Component({
  selector: 'app-companies',
  imports: [
    SpinnerComponent,
    CompanyListCardComponent,
    RouterLink,
    AsyncPipe,
    NgIf,
  ],
  templateUrl: './companies.component.html',
  styleUrl: './companies.component.scss',
})
export class CompaniesComponent {
  // isLoading = signal<boolean>(false);
  // errorCaught = signal<string>('');
  private companyService = inject(CompanyService);
  private refreshTrigger = new BehaviorSubject<void>(undefined);
  // private destroyRef = inject(DestroyRef);

  companies$ = this.refreshTrigger.pipe(
    switchMap(() =>
      this.companyService.getCompanies().pipe(
        map((data) => ({ companies: data, isLoading: false, errorMsg: null })),
        startWith({
          companies: [],
          isLoading: true,
          errorMsg: null,
        }),
        catchError((err: Error) => {
          return of({
            companies: [],
            isLoading: false,
            errorMsg: err.message,
          });
        })
      )
    )
  );

  onDeleteChange() {
    this.refreshTrigger.next();
  }
  // companies$ = this.companyService.getCompanies().pipe(
  //   map((data) => ({
  //     companies: data,
  //     isLoading: false,
  //     errorMsg: null,
  //   })),
  //   startWith({
  //     companies: [],
  //     isLoading: true,
  //     errorMsg: null,
  //   }),
  //   catchError((err: Error) => {
  //     return of({
  //       companies: [],
  //       isLoading: false,
  //       errorMsg: err.message,
  //     });
  //   })
  // );

  // ngOnInit(): void {
  //   this.isLoading.set(true);
  //   const subscription = this.companyService.getCompanies().subscribe({
  //     next: (data) => {
  //       this.companyService.companyData.set(data);
  //     },
  //     error: (err: Error) => {
  //       this.isLoading.set(false);
  //       this.errorCaught.set(err.message);
  //     },
  //     complete: () => {
  //       this.isLoading.set(false);
  //     },
  //   });

  //   this.destroyRef.onDestroy(() => subscription.unsubscribe());
  // }

  // get companies() {
  //   return this.companyService.loadedCompanyData();
  // }
}
