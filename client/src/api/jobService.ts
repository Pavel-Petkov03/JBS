import { apiClient } from './apiClient';
import type {
  Job,
  JobFilters,
  JobsResponse,
  JobApplicationsResponse,
  CreateJobData,
  JobApplication
} from '../types/jobs';

export const jobService = {
  getJobs: (filters: JobFilters): Promise<JobsResponse> =>
    apiClient.get('/jobs', { params: filters })
      .then(response => response.data),

  createJob: (data: CreateJobData): Promise<Job> =>
    apiClient.post('/jobs', data)
      .then(response => response.data.newJob),

  getJob: (jobId: string): Promise<Job> =>
    apiClient.get(`/jobs/${jobId}`)
      .then(response => response.data.job),

  updateJob: (jobId: string, data: Partial<CreateJobData>): Promise<Job> =>
    apiClient.put(`/jobs/${jobId}`, data)
      .then(response => response.data.updatedJob),

  deleteJob: (jobId: string): Promise<Job> =>
    apiClient.delete(`/jobs/${jobId}`)
      .then(response => response.data),

  getJobApplications: (jobId: string, status: string): Promise<JobApplicationsResponse> =>
    apiClient.get(`/jobs/${jobId}/applications?status=${status}`)
      .then(response => response.data),

  applyToJob: (jobId: string): Promise<JobApplication> =>
    apiClient.post(`/jobs/${jobId}/applications`)
      .then(response => response.data.application),
};
