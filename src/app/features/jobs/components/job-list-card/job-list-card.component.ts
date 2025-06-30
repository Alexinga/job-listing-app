import { Component, input } from '@angular/core';
import { JobList } from '../../models/jobList';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-job-list-card',
  imports: [DatePipe, RouterLink],
  templateUrl: './job-list-card.component.html',
  styleUrl: './job-list-card.component.scss',
})
export class JobListCardComponent {
  jobListData = input.required<JobList>();
}
