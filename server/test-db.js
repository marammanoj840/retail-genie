import mongoose from 'mongoose';
const uri = "mongodb://marammanoj840_db_user:<WMKrQAKBUE3lKPHq>@ac-ac4amab-shard-00-00.gqxdr7s.mongodb.net:27017,ac-ac4amab-shard-00-01.gqxdr7s.mongodb.net:27017,ac-ac4amab-shard-00-02.gqxdr7s.mongodb.net:27017/retail-genie?ssl=true&replicaSet=atlas-ekv3h2-shard-0&authSource=admin&retryWrites=true&w=majority";

async function run() {
  try {
    console.log("Connecting to:", uri);
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    console.log("SUCCESS: Connected to MongoDB Atlas!");
    process.exit(0);
  } catch (err) {
    console.error("FAILURE: Connection failed!");
    console.error("Error Name:", err.name);
    console.error("Error Message:", err.message);
    if (err.message.includes("querySrv")) {
      console.error("DIAGNOSIS: DNS cannot resolve the SRV record. This is likely an ISP or Local Network DNS issue.");
    } else if (err.message.includes("Authentication failed")) {
      console.error("DIAGNOSIS: Username or password is incorrect.");
    }
    process.exit(1);
  }
}

run();
