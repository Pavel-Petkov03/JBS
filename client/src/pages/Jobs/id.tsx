import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { jobService } from '../../api/jobService';
import type { Job } from '../../types/jobs';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import ErrorMessage from '../../components/ui/ErrorMessage';
import { formatDate } from '../../utils/helpers';
import { useAuth } from '../../contexts/AuthContext';

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [applying, setApplying] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const data = await jobService.getJob(id!);
        setJob(data);
      } catch (err) {
        setError('Failed to fetch job details');
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const handleApply = async () => {
    if (!isAuthenticated) {
      setError('Please login to apply');
      return;
    }

    setApplying(true);
    try {
      await jobService.applyToJob(id!);
      setError('');
      alert('Application submitted successfully!');
    } catch (err) {
      setError('Failed to apply to job');
    } finally {
      setApplying(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!job) return <div>Job not found</div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold">{job.title}</h1>
            <p className="text-xl text-gray-600 mt-2">
              {job.company} • {job.location}
            </p>
          </div>
          <div className="flex flex-col items-end">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mb-2">
              {job.jobType}
            </span>
            <span className="text-gray-500 text-sm">
              Posted {formatDate(job.createdAt)}
            </span>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Job Description</h2>
          <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-3">Requirements</h3>
            <ul className="list-disc pl-5 space-y-1">
              {job.requirements.map((req, i) => (
                <li key={i}>{req}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Benefits</h3>
            <ul className="list-disc pl-5 space-y-1">
              {job.benefits.map((benefit, i) => (
                <li key={i}>{benefit}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {job.tags.map((tag, i) => (
            <span key={i} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
              {tag}
            </span>
          ))}
        </div>

        <div className="border-t pt-6">
          <button
            onClick={handleApply}
            disabled={applying}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
          >
            {applying ? 'Applying...' : 'Apply Now'}
          </button>
          {error && <p className="mt-2 text-red-500">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default JobDetails;