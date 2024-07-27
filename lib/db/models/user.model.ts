import { Schema, model, models, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  image?: string;
  emailVerified: boolean;
  joinedAt: Date;
}

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
  },
  emailVerified: {
    type: Boolean,
    required: true,
  },
  joinedAt: {
    type: Date,
    default: Date.now,
  },
});

const User = models.User || model('User', UserSchema);

export default User;
