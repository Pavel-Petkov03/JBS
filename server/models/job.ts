import {mongoose} from "../config/mongoose"

export interface IJob extends mongoose.Document {
  title: string;
  description: string;
  salaryRange: string;
  jobType: 'Full-time' | 'Part-time' | 'Remote';
  company: mongoose.Types.ObjectId;
  location: string;
  requirements: string[];
  experienceLevel: 'Junior' | 'Mid-level' | 'Senior'; 
  postedDate: Date;
  benefits?: string[];
  tags: string[];
}

const JobSchema = new mongoose.Schema<IJob>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  salaryRange: { type: String, required: true },
  jobType: { type: String, enum: ['Full-time', 'Part-time', 'Remote'], required: true },
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  location: { type: String, required: true },
  requirements: [{ type: String }],
  experienceLevel: { type: String, enum: ['Junior', 'Mid-level', 'Senior'], required: true },
  postedDate: { type: Date, default: Date.now },
  benefits: [{ type: String }],
  tags: [{ type: String }],
});

export const JobModel = mongoose.model<IJob>('Job', JobSchema);