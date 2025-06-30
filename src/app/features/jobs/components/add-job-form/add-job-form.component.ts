import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Location } from '../../models/location';

import { ActivatedRoute, CanDeactivateFn, Router } from '@angular/router';
import { JobListService } from '../../services/joblist.service';
import { NewJobList } from '../../models/jobList';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LOCATION_DATA } from '../../locationJSON';

@Component({
  selector: 'app-add-job-form',
  imports: [ReactiveFormsModule],
  templateUrl: './add-job-form.component.html',
  styleUrl: './add-job-form.component.scss',
})
export class AddJobFormComponent {
  private router = inject(ActivatedRoute);
  private route = inject(Router);
  private jobListService = inject(JobListService);
  private destroyRef = inject(DestroyRef);
  companyId = +this.router.snapshot.paramMap.get('companyId')!;
  submitted = false;
  private buildJobPayLoad(): NewJobList {
    return {
      created_at: new Date().toISOString(),
      title: this.addJobForm.controls.jobTitle.value!,
      description: this.addJobForm.controls.jobDescription.value!,
      location: {
        city: this.locationControls.city.value!,
        state: this.locationControls.state.value!,
        country: this.locationControls.country.value!,
      },
      salary: +this.jobDescriptionControls.salary.value!,
      contact: {
        name: this.contactControls.contactName.value!,
        phone: this.contactControls.contactPhone.value!,
        email: this.contactControls.contactEmail.value!,
      },
      job_type: this.jobDescriptionControls.jobTypeRadio.value!,
      position: this.jobDescriptionControls.positionRadio.value!,
      company_id: this.companyId,
    };
  }

  jobTypeRadioArr = signal<string[]>(['onsite', 'hybrid', 'remote']);
  positionRadioArr = signal<string[]>(['full time', 'part time', 'contract']);
  locationArr = signal<Location[]>(LOCATION_DATA);

  selectedStateArr = computed<string[]>(() =>
    // const arrStateNames = this.locationArr().map((state) =>
    //   state.states.map((s) => s.name)
    // );
    // const mergeStateNames = arrStateNames.flatMap((item) => item);

    // return mergeStateNames;
    this.locationArr()
      .flatMap((location) => location.states)
      .map((state) => state.name)
  );

  selectedCitiesArr = computed<string[]>(() =>
    // const arrCityNames = this.locationArr().map((city) =>
    //   city.states.map((c) => c.cities)
    // );
    // const mergeCityNames = arrCityNames.flatMap((item) =>
    //   item.flatMap((i) => i)
    // );
    // return mergeCityNames;
    this.locationArr()
      .flatMap((location) => location.states)
      .flatMap((state) => state.cities)
  );

  addJobForm = new FormGroup({
    jobTitle: new FormControl('', {
      validators: [Validators.required],
    }),

    jobDescriptionParent: new FormGroup({
      jobTypeRadio: new FormControl(''),

      positionRadio: new FormControl(''),

      salary: new FormControl('', {
        validators: [Validators.required],
      }),
    }),

    locationParent: new FormGroup({
      country: new FormControl('', { validators: Validators.required }),
      state: new FormControl('', { validators: Validators.required }),
      city: new FormControl('', { validators: Validators.required }),
    }),

    contactParent: new FormGroup({
      contactName: new FormControl('', { validators: Validators.required }),
      contactPhone: new FormControl('', { validators: Validators.required }),
      contactEmail: new FormControl('', {
        validators: [Validators.required, Validators.email],
      }),
    }),
    jobDescription: new FormControl(''),
  });

  get locationControls() {
    return this.addJobForm.controls.locationParent.controls;
  }
  get jobDescriptionControls() {
    return this.addJobForm.controls.jobDescriptionParent.controls;
  }

  get contactControls() {
    return this.addJobForm.controls.contactParent.controls;
  }

  get invalidLocationState() {
    return (
      this.locationControls.state.invalid &&
      (this.locationControls.state.touched || this.locationControls.state.dirty)
    );
  }

  get invalidLocationCity() {
    return (
      this.locationControls.city.invalid &&
      (this.locationControls.city.touched || this.locationControls.city.dirty)
    );
  }

  get invalidLocationCountry() {
    return (
      this.locationControls.country.invalid &&
      (this.locationControls.country.touched ||
        this.locationControls.country.dirty)
    );
  }

  get invalidContactName() {
    return (
      this.contactControls.contactName.invalid &&
      (this.contactControls.contactName.touched ||
        this.contactControls.contactName.dirty)
    );
  }

  get invalidContactEmail() {
    return (
      this.contactControls.contactEmail.invalid &&
      (this.contactControls.contactEmail.touched ||
        this.contactControls.contactEmail.dirty)
    );
  }

  get invalidContactPhone() {
    return (
      this.contactControls.contactPhone.invalid &&
      (this.contactControls.contactPhone.touched ||
        this.contactControls.contactPhone.dirty)
    );
  }

  get invalidJobTitle() {
    return (
      this.addJobForm.controls.jobTitle.invalid &&
      (this.addJobForm.controls.jobTitle.touched ||
        this.addJobForm.controls.jobTitle.dirty)
    );
  }

  get invalidSalary() {
    return (
      this.addJobForm.controls.jobDescriptionParent.controls.salary.invalid &&
      (this.addJobForm.controls.jobDescriptionParent.controls.salary.touched ||
        this.addJobForm.controls.jobDescriptionParent.controls.salary.dirty)
    );
  }

  // this should hold all of the form values
  get EnteredFormValues() {
    return (
      this.addJobForm.controls.jobTitle.value ||
      this.addJobForm.controls.jobDescription.value ||
      this.locationControls.city.value ||
      this.locationControls.state.value ||
      this.locationControls.country.value ||
      this.jobDescriptionControls.salary.value ||
      this.contactControls.contactName.value ||
      this.contactControls.contactPhone.value ||
      this.contactControls.contactEmail.value ||
      this.jobDescriptionControls.jobTypeRadio.value ||
      this.jobDescriptionControls.positionRadio.value
    );
  }
  onAddNewJob() {
    const newJobObj = this.buildJobPayLoad();

    this.jobListService
      .postJobList(newJobObj)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.submitted = true;
          this.addJobForm.reset();
          this.route.navigate(['/'], { replaceUrl: true });
        },
      });

    // this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}

export const canLeaveAddFormPage: CanDeactivateFn<AddJobFormComponent> = (
  component
) => {
  // we can submit the form without getting the window confirm
  if (component.submitted) {
    return true;
  }
  if (component.EnteredFormValues) {
    return window.confirm(
      `Do you really want to leave? You will lose the entered data`
    );
  }

  return true;
};
