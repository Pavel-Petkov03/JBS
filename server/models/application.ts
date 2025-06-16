import mongoose, { Schema, Document } from "mongoose";

export interface IApplication extends Document {
  candidate: mongoose.Types.ObjectId;
  job: mongoose.Types.ObjectId;
  resumeUrl: string;
  status: "Pending" | "Reviewed" | "Interview" | "Rejected" | "Accepted";
  submissionDate: Date;
  interviewDate?: Date;
  resumePublicId : string;
}

const ApplicationSchema = new Schema<IApplication>(
  {
    candidate: { type: Schema.Types.ObjectId, ref: "Candidate", required: true },
    job: { type: Schema.Types.ObjectId, ref: "Job", required: true },
    resumeUrl: { type: String, required: true },
    resumePublicId : {type : String, required : true},
    status: {
      type: String,
      enum: ["Pending", "Reviewed", "Interview", "Rejected", "Accepted"],
      default: "Pending",
    },
    submissionDate: { type: Date, default: Date.now },
    interviewDate: { type: Date },
  },
  { timestamps: true }
);

export const ApplicationModel = mongoose.model<IApplication>("Application", ApplicationSchema);