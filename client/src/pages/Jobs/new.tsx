import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jobService } from '../../api/jobService';
import { JOB_TYPES, EXPERIENCE_LEVELS } from '../../utils/constants';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
type ArrayFields = 'requirements' | 'benefits' | 'tags';

const CreateJobPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    salaryRange: '',
    jobType: JOB_TYPES[0],
    company: '',
    location: '',
    requirements: [''],
    experienceLevel: EXPERIENCE_LEVELS[0],
    benefits: [''],
    tags: ['']
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (field: ArrayFields, index: number, value: string) => {
    setFormData(prev => ({
        ...prev,
        [field]: prev[field].map((item, i) => i === index ? value : item)
        }));
    };

  const addArrayItem = (field: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field as keyof typeof formData], '']
    }));
  };

  const removeArrayItem = (field: ArrayFields, index: number) => {
  setFormData(prev => {
    const currentArray = prev[field];
    const newArray = currentArray.filter((_, i) => i !== index);
    return {
      ...prev,
      [field]: newArray
    };
        });
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Filter out empty strings from arrays
      const dataToSend = {
        ...formData,
        requirements: formData.requirements.filter(item => item.trim() !== ''),
        benefits: formData.benefits.filter(item => item.trim() !== ''),
        tags: formData.tags.filter(item => item.trim() !== '')
      };

      await jobService.createJob(dataToSend);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to create job. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">Create New Job Posting</h1>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2">Job Title*</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Company*</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Description*</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded min-h-[150px]"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-gray-700 mb-2">Salary Range*</label>
              <input
                type="text"
                name="salaryRange"
                value={formData.salaryRange}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Job Type*</label>
              <select
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                {JOB_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Experience Level*</label>
              <select
                name="experienceLevel"
                value={formData.experienceLevel}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                {EXPERIENCE_LEVELS.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Location*</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Requirements*</label>
            {formData.requirements.map((req, index) => (
              <div key={index} className="flex mb-2">
                <input
                  type="text"
                  value={req}
                  onChange={(e) => handleArrayChange('requirements', index, e.target.value)}
                  className="flex-grow p-2 border rounded"
                  required={index === 0}
                />
                {formData.requirements.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem('requirements', index)}
                    className="ml-2 px-3 bg-red-500 text-white rounded"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('requirements')}
              className="mt-2 px-4 py-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              Add Requirement
            </button>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Benefits</label>
            {formData.benefits.map((benefit, index) => (
              <div key={index} className="flex mb-2">
                <input
                  type="text"
                  value={benefit}
                  onChange={(e) => handleArrayChange('benefits', index, e.target.value)}
                  className="flex-grow p-2 border rounded"
                />
                {formData.benefits.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem('benefits', index)}
                    className="ml-2 px-3 bg-red-500 text-white rounded"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('benefits')}
              className="mt-2 px-4 py-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              Add Benefit
            </button>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Tags</label>
            {formData.tags.map((tag, index) => (
              <div key={index} className="flex mb-2">
                <input
                  type="text"
                  value={tag}
                  onChange={(e) => handleArrayChange('tags', index, e.target.value)}
                  className="flex-grow p-2 border rounded"
                />
                {formData.tags.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem('tags', index)}
                    className="ml-2 px-3 bg-red-500 text-white rounded"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('tags')}
              className="mt-2 px-4 py-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              Add Tag
            </button>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Create Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateJobPage;