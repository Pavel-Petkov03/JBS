// src/pages/Dashboard/applications.tsx
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { jobService } from '../../api/jobService';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import ErrorMessage from '../../components/ui/ErrorMessage';
import type { JobApplication } from '../../types/jobs';

const ApplicationsPage = () => {
  const { jobId } = useParams();
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const data = await jobService.getJobApplications(
          jobId || '', 
          statusFilter === 'all' ? '' : statusFilter
        );
        setApplications(data.applications);
      } catch (err) {
        setError('Failed to fetch applications');
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [jobId, statusFilter]);

//   const updateApplicationStatus = async (applicationId: string, newStatus: string) => {
//     try {
//       // You would need to implement this endpoint in your API
//       // await jobService.updateApplicationStatus(applicationId, newStatus);
//       setApplications(prev =>
//         prev.map(app =>
//           app.id === applicationId ? { ...app, status: newStatus } : app
//         )
//       );
//     } catch (err) {
//       setError('Failed to update application status');
//     }
//   };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Job Applications</h1>
        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="reviewed">Reviewed</option>
            <option value="rejected">Rejected</option>
            <option value="accepted">Accepted</option>
          </select>
        </div>
      </div>

      {applications.length === 0 ? (
        <p className="text-gray-500">No applications found.</p>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Candidate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applied On
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {applications.map((application) => (
                <tr key={application.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {/* {application.candidate.name} */}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {application.candidate.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {new Date(application.appliedAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      application.status === 'accepted'
                        ? 'bg-green-100 text-green-800'
                        : application.status === 'rejected'
                        ? 'bg-red-100 text-red-800'
                        : application.status === 'reviewed'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {application.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 space-x-2">
                    <button
                    //   onClick={() => updateApplicationStatus(application.id, 'reviewed')}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Review
                    </button>
                    <button
                    //   onClick={() => updateApplicationStatus(application.id, 'accepted')}
                      className="text-green-600 hover:text-green-900"
                    >
                      Accept
                    </button>
                    <button
                    //   onClick={() => updateApplicationStatus(application.id, 'rejected')}
                      className="text-red-600 hover:text-red-900"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ApplicationsPage;