import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/retail-genie');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error Connecting to MongoDB: ${error.message}`);
    // For a demo-ready application, we won't crash the server immediately 
    // to allow front-end development, but let's log the error.
    console.warn('Warning: Make sure MongoDB is running locally or provide a valid MONGO_URI.');
  }
};

export default connectDB;
