import { Link } from 'react-router-dom';
import type { Job } from '../../types/jobs';
import { formatDate } from '../../utils/helpers';

interface JobCardProps {
  job: Job;
  showApplyButton?: boolean;
  onApply?: (jobId: string) => void;
}

const JobCard = ({ job, showApplyButton = true, onApply }: JobCardProps) => {
  return (
    <div className="border rounded-lg p-6 mb-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold">
            <Link to={`/jobs/${job.id}`} className="hover:text-blue-600">
              {job.title}
            </Link>
          </h3>
          <p className="text-gray-600 mt-1">
            {job.company} • {job.location}
          </p>
        </div>
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
          {job.jobType}
        </span>
      </div>
      
      <div className="mt-4">
        <p className="text-gray-700 line-clamp-2">{job.description}</p>
      </div>
      
      <div className="mt-4 flex flex-wrap gap-2">
        {job.tags.slice(0, 3).map((tag, index) => (
          <span key={index} className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">
            {tag}
          </span>
        ))}
      </div>
      
      <div className="mt-4 flex justify-between items-center">
        <p className="text-gray-500 text-sm">
          Posted {formatDate(job.createdAt)}
        </p>
        {showApplyButton && onApply && (
          <button
            onClick={() => onApply(job.id)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Apply Now
          </button>
        )}
      </div>
    </div>
  );
};

export default JobCard;