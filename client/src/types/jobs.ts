export interface Job {
  id: string;
  title: string;
  description: string;
  salaryRange: string;
  jobType: string;
  company: string;
  location: string;
  requirements: string[];
  experienceLevel: string;
  benefits: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface JobApplication {
  id: string;
  jobId: string;
  candidateId: string;
  status: 'pending' | 'reviewed' | 'rejected' | 'accepted';
  appliedAt: string;
  candidate : {
    email : string
  }
}

export interface JobFilters {
  page: number;
  limit: number;
  search?: string;
  jobType?: string[];
  experienceLevel?: string[];
  location?: string[];
}


export interface JobsResponse {
  jobs: Job[];
  total: number;
}

export interface JobApplicationsResponse {
  applications: JobApplication[];
  total: number;
}

export interface CreateJobData {
  title: string;
  description: string;
  salaryRange: string;
  jobType: string;
  company: string;
  location: string;
  requirements: string[];
  experienceLevel: string;
  benefits: string[];
  tags: string[];
}

