import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { CompanyService } from '../../data/service/company.service';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';
import { CompanyListCardComponent } from '../../modules/company-list-card/company-list-card.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-companies',
  imports: [SpinnerComponent, CompanyListCardComponent, RouterLink],
  templateUrl: './companies.component.html',
  styleUrl: './companies.component.scss',
})
export class CompaniesComponent implements OnInit {
  isLoading = signal<boolean>(false);
  errorCaught = signal<string>('');
  private companyService = inject(CompanyService);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.isLoading.set(true);
    const subscription = this.companyService.getCompanies().subscribe({
      next: (data) => {
        this.companyService.companyData.set(data);
      },
      error: (err: Error) => {
        this.isLoading.set(false);
        this.errorCaught.set(err.message);
      },
      complete: () => {
        this.isLoading.set(false);
      },
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  get companies() {
    return this.companyService.loadedCompanyData();
  }
}
