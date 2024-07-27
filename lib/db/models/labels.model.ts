import { Schema, model, models, Document, Types } from 'mongoose';

export interface ILabel extends Document {
  user_id: Schema.Types.ObjectId;
  name: string;
  color: string;
  created_at: Date;
  updated_at: Date;
}

const LabelSchema = new Schema({
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

const Label = models.Label || model<ILabel>('Label', LabelSchema);

export default Label;
