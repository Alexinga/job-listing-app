import { Component, DestroyRef, inject, input } from '@angular/core';
import { Company } from '../../data/schema/company';
import { DatePipe } from '@angular/common';
import { CompanyService } from '../../data/service/company.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-company-list-card',
  imports: [DatePipe, RouterLink],
  templateUrl: './company-list-card.component.html',
  styleUrl: './company-list-card.component.scss',
})
export class CompanyListCardComponent {
  companyList = input.required<Company>();

  companyService = inject(CompanyService);
  destroyRef = inject(DestroyRef);

  onDeleteCompany() {
    const subscription = this.companyService
      .deleteCompany(this.companyList().id)
      .subscribe({
        next: () => {
          // alert('Successfully Deleted');
          // I could refetch api and create another subscription to refetch the data
          // or
          // Manually refetch to update the UI
          const currentCompanyData = this.companyService.companyData();
          const filtered = currentCompanyData.filter(
            (data) => data.id !== this.companyList().id
          );
          this.companyService.companyData.set(filtered);
        },
        error: (err: Error) => {
          console.error(`There was an error on deleting: ${err.message}`);
        },
      });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
