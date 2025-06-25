export type JobList = {
  id: number;
  created_at: string;
  title: string;
  description: string;
  location: {
    city: string;
    state: string;
    country: string;
  };
  salary: number;
  contact: {
    name: string;
    phone: string;
    email: string;
  };
  job_type: string;
  position: string;
  company_id: number;
};

export type NewJobList = Omit<JobList, 'id'>;
