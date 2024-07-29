import { Schema, model, models, Document, Types } from 'mongoose';

export interface ILabel extends Document {
  userId: Schema.Types.ObjectId;
  name: string;
  color?: string;
  createdAt: Date;
  updatedAt: Date;
}

const LabelSchema = new Schema({
  userId: {
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

const Label = models.Label || model<ILabel>('Label', LabelSchema);

export default Label;
