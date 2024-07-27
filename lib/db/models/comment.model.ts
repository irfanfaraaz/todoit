import { Schema, model, models, Document, Types } from 'mongoose';

export interface IComment extends Document {
  todo_id: Schema.Types.ObjectId;
  user_id: Schema.Types.ObjectId;
  content: string;
  created_at: Date;
  updated_at: Date;
}

const CommentSchema = new Schema({
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
  content: {
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

const Comment = models.Comment || model<IComment>('Comment', CommentSchema);

export default Comment;
