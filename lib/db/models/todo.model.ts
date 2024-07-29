import { Schema, model, models, Document } from 'mongoose';

export interface ITodo extends Document {
  projectId?: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  labelId?: Schema.Types.ObjectId;
  title: string;
  description?: string;
  due_date: Date;
  priority: number;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TodoSchema = new Schema({
  projectId: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
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
    required: true,
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

const Todo = models.Todo || model<ITodo>('Todo', TodoSchema);

export default Todo;
