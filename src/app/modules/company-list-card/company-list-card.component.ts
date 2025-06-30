import {
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  input,
  output,
} from '@angular/core';
import { Company } from '../../data/schema/company';
import { DatePipe } from '@angular/common';
import { CompanyService } from '../../data/service/company.service';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-company-list-card',
  imports: [DatePipe, RouterLink],
  templateUrl: './company-list-card.component.html',
  styleUrl: './company-list-card.component.scss',
})
export class CompanyListCardComponent {
  companyList = input.required<Company>();
  companyDelete = output();
  companyService = inject(CompanyService);
  destroyRef = inject(DestroyRef);

  onDeleteCompany() {
    this.companyService
      .deleteCompany(this.companyList().id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          // output to let know of a trigger change with and to refetch data
          this.companyDelete.emit();
          // alert('Successfully Deleted');
          // I could refetch api and create another subscription to refetch the data
          // or
          // Manually refetch to update the UI
          // const currentCompanyData = this.companyService.companyData();
          // const filtered = currentCompanyData.filter(
          //   (data) => data.id !== this.companyList().id
          // );
          // this.companyService.companyData.set(filtered);
        },
        error: (err: Error) => {
          console.error(`There was an error on deleting: ${err.message}`);
        },
      });
    // this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
