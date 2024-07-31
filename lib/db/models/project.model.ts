import { Schema, model, models, Document } from 'mongoose';

export interface IProject extends Document {
  userId: Schema.Types.ObjectId;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Project = models.Project || model<IProject>('Project', ProjectSchema);

export default Project;
