import { Component, DestroyRef, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CompanyService } from '../../data/service/company.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-company',
  imports: [ReactiveFormsModule],
  templateUrl: './add-company.component.html',
  styleUrl: './add-company.component.scss',
})
export class AddCompanyComponent {
  private companyService = inject(CompanyService);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);

  addCompanyForm = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required],
    }),
  });

  get invalidCompany() {
    return (
      this.addCompanyForm.controls.name.invalid &&
      this.addCompanyForm.controls.name.touched
    );
  }

  onSubmit() {
    const nameToCheck = this.addCompanyForm.controls.name
      .value!.trim()
      .toLowerCase();
    const existingNames = this.companyService
      .companyData()
      .map((data) => data.name.trim().toLowerCase());
    if (existingNames.includes(nameToCheck)) {
      alert('Company name already exists');
      this.addCompanyForm.reset();
      return;
    }

    const newCompany = {
      created_at: new Date().toISOString(),
      name: this.addCompanyForm.controls.name.value!,
    };

    const subscription = this.companyService
      .postCompanies(newCompany)
      .subscribe({
        next: (res) => {
          this.addCompanyForm.reset();
          this.router.navigate(['/companies'], { replaceUrl: true });
        },
        error: (err: Error) => {
          console.error(`Insert Failed: ${err.message}`);
        },
      });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
