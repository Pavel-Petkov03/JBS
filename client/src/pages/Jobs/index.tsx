import { useState } from 'react';
import  JobCard from '../../components/jobs/JobCard';
import { useJobs } from '../../hooks/useJobs';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import ErrorMessage from '../../components/ui/ErrorMessage';
import Pagination from '../../components/ui/Pagination';

const JobsPage = () => {
  const { jobs, total, loading, error, filters, setFilters, applyToJob } = useJobs();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    setFilters(prev => ({
      ...prev,
      page: 1,
      search: searchTerm
    }));
  };

  const handlePageChange = (page: number) => {
    setFilters(prev => ({ ...prev, page }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Job Listings</h1>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow p-2 border rounded"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Search
          </button>
        </div>
      </div>

      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} onRetry={() => setFilters({ page: 1, limit: 10 })} />}

      <div className="space-y-6">
        {jobs.map(job => (
          <JobCard 
            key={job.id} 
            job={job} 
            showApplyButton 
            onApply={applyToJob} 
          />
        ))}
      </div>

      {total > 0 && (
        <Pagination
          currentPage={filters.page}
          totalPages={Math.ceil(total / filters.limit)}
          onPageChange={handlePageChange}
          className="mt-8"
        />
      )}
    </div>
  );
};

export default JobsPage;