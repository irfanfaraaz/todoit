import { Schema, model, models, Document, Types } from 'mongoose';

export interface ISubTask extends Document {
  todo_id: Schema.Types.ObjectId;
  user_id: Schema.Types.ObjectId;
  title: string;
  description?: string;
  due_date?: Date;
  priority: number;
  is_completed: boolean;
  created_at: Date;
  updated_at: Date;
}

const SubTaskSchema = new Schema({
  todo_id: {
    type: Schema.Types.ObjectId,
    ref: 'Todo',
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  due_date: {
    type: Date,
  },
  priority: {
    type: Number,
    default: 1,
  },
  is_completed: {
    type: Boolean,
    default: false,
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

const SubTask = models.SubTask || model<ISubTask>('SubTask', SubTaskSchema);

export default SubTask;
