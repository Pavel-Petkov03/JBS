// src/pages/Dashboard/index.tsx
import { useAuth } from '../../contexts/AuthContext';
import { useJobs } from '../../hooks/useJobs';
import JobCard from '../../components/jobs/JobCard';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  const { user } = useAuth();
  const { jobs, loading } = useJobs({
    page: 1,
    limit: 5,
    ...(user?.role === 'employer' ? { employerId: user.id } : {})
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Welcome, {user?.name}</h2>
        <p className="text-gray-600">
          {user?.role === 'employer' 
            ? 'Manage your job postings and applications.' 
            : 'View and apply to jobs that match your skills.'}
        </p>
      </div>

      {user?.role === 'employer' && (
        <div className="mb-8">
          <Link
            to="/jobs/new"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Post New Job
          </Link>
        </div>
      )}

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {user?.role === 'employer' ? 'Your Recent Jobs' : 'Recommended Jobs'}
        </h2>
        
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="space-y-4">
            {jobs.length > 0 ? (
              jobs.map(job => (
                <JobCard 
                  key={job.id} 
                  job={job} 
                  showApplyButton={user?.role === 'candidate'}
                />
              ))
            ) : (
              <p className="text-gray-500">
                {user?.role === 'employer' 
                  ? 'You have not posted any jobs yet.' 
                  : 'No recommended jobs found.'}
              </p>
            )}
          </div>
        )}
      </div>

      {user?.role === 'employer' && jobs.length > 0 && (
        <div>
          <Link
            to="/dashboard/applications"
            className="text-blue-500 hover:underline"
          >
            View all applications →
          </Link>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;