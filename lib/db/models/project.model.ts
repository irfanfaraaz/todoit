import { Schema, model, models, Document } from 'mongoose';

export interface IProject extends Document {
  user_id: Schema.Types.ObjectId;
  name: string;
  color: string;
  created_at: Date;
  updated_at: Date;
}

const ProjectSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

const Project = models.Project || model<IProject>('Project', ProjectSchema);

export default Project;
