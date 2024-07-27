import { Schema, model, models, Document } from 'mongoose';

export interface ITodo extends Document {
  project_id?: Schema.Types.ObjectId;
  user_id: Schema.Types.ObjectId;
  title: string;
  description?: string;
  due_date?: Date;
  priority: number;
  is_completed: boolean;
  created_at: Date;
  updated_at: Date;
}

const TodoSchema = new Schema({
  project_id: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
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

const Todo = models.Todo || model<ITodo>('Todo', TodoSchema);

export default Todo;
