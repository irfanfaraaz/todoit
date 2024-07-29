import mongoose from 'mongoose';

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  mongoose.set('strictQuery', true);

  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined');
  }
  if (isConnected) {
    return console.log('=> using existing database connection');
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'TodoIT',
    });
    isConnected = true;
  } catch (e) {
    console.log('=> database connection failed');
    console.log(e);
  }
};
