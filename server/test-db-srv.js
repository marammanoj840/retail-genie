import mongoose from 'mongoose';
import dns from 'dns';

// Force Google DNS for the whole process
dns.setServers(['8.8.8.8']);

const uri = "mongodb+srv://marammanoj840_db_user:WMKrQAKBUE3lKPHq@cluster0.gqxdr7s.mongodb.net/retail-genie?retryWrites=true&w=majority&appName=Cluster0";

async function run() {
  try {
    console.log("Connecting (forcing 8.8.8.8) to srv:", uri);
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    console.log("SUCCESS: Connected to MongoDB Atlas via srv!");
    process.exit(0);
  } catch (err) {
    console.error("FAILURE: Connection failed!");
    console.error("Error Name:", err.name);
    console.error("Error Message:", err.message);
    process.exit(1);
  }
}

run();
