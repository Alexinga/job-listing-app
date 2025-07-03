import { AddCompanyComponent } from '../../features/companies/components/add-company/add-company.component';
import {
  AddJobFormComponent,
  canLeaveAddFormPage,
} from '../../features/jobs/components/add-job-form/add-job-form.component';
import {
  JobListDescComponent,
  resolveJobTitles,
} from '../../features/jobs/components/job-list-desc/job-list-desc.component';
import { CompaniesComponent } from '../../features/companies/pages/companies/companies.component';
import { MainComponent } from '../../features/jobs/pages/main/main.component';
import { TablePageComponent } from '../../features/table-overview/pages/table-page/table-page.component';

export const childRoutes = [
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
    path: 'table',
    component: TablePageComponent,
  },
];
