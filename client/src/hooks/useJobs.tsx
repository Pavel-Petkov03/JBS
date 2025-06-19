import { useState, useEffect } from 'react';
import { jobService } from '../api/jobService';
import type { Job, JobFilters } from '../types/jobs';

export const useJobs = (initialFilters: JobFilters = { page: 1, limit: 10 }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState<JobFilters>(initialFilters);

  const fetchJobs = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await jobService.getJobs(filters);
      setJobs(data.jobs);
      setTotal(data.total);
    } catch (err) {
      setError('Failed to fetch jobs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [filters]);

  const applyToJob = async (jobId: string) => {
    try {
      await jobService.applyToJob(jobId);
      return true;
    } catch (err) {
      setError('Failed to apply to job');
      return false;
    }
  };

  return {
    jobs,
    total,
    loading,
    error,
    filters,
    setFilters,
    refresh: fetchJobs,
    applyToJob
  };
};