import { Schema, model, models, Document, Types } from 'mongoose';

export interface ISubTask extends Document {
  parentId: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  labelId?: Schema.Types.ObjectId;
  title: string;
  description?: string;
  dueDate?: Date;
  priority: number;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SubTaskSchema = new Schema({
  parentId: {
    type: Schema.Types.ObjectId,
    ref: 'Todo',
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  labelId: {
    type: Schema.Types.ObjectId,
    ref: 'Label',
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  dueDate: {
    type: Date,
  },
  priority: {
    type: Number,
    default: 1,
  },
  isCompleted: {
    type: Boolean,
    default: false,
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

const SubTask = models.SubTask || model<ISubTask>('SubTask', SubTaskSchema);

export default SubTask;
