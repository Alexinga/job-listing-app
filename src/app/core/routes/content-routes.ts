import { AddCompanyComponent } from '../../modules/add-company/add-company.component';
import {
  AddJobFormComponent,
  canLeaveAddFormPage,
} from '../../modules/add-job-form/add-job-form.component';
import {
  JobListDescComponent,
  resolveJobTitles,
} from '../../modules/job-list-desc/job-list-desc.component';
import { TestComponent } from '../../modules/test/test.component';
import { CompaniesComponent } from '../../pages/companies/companies.component';
import { MainComponent } from '../../pages/main/main.component';

export const routes = [
  {
    path: '',
    component: MainComponent,
  },
  {
    path: 'job/:id',
    component: JobListDescComponent,
    title: resolveJobTitles,
  },
  {
    path: 'job/add/:companyName/:companyId',
    component: AddJobFormComponent,
    canDeactivate: [canLeaveAddFormPage],
  },
  {
    path: 'companies',
    component: CompaniesComponent,
  },
  {
    path: 'companies/add',
    component: AddCompanyComponent,
  },
  {
    path: 'test',
    component: TestComponent,
  },
];
