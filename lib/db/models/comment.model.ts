import { Schema, model, models, Document, Types } from 'mongoose';

export interface IComment extends Document {
  todoId: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const CommentSchema = new Schema({
  todoId: {
    type: Schema.Types.ObjectId,
    ref: 'Todo',
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  content: {
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

const Comment = models.Comment || model<IComment>('Comment', CommentSchema);

export default Comment;
