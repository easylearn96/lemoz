
import mongoose from "mongoose";
export class ConnectMongoDB {
    constructor(){
        if(!process.env.MONGODB_URL) {
            console.error("CRITICAL ERROR: MONGODB_URL is not defined in .env");
            this.databaseURL = "";
        } else {
            this.databaseURL = process.env.MONGODB_URL;
        }
    }
   
   async connectDB(){
       if (!this.databaseURL) {
           console.error("MongoDB connection skipped: No MONGODB_URL provided.");
           return;
       }
       try {
           await mongoose.connect(this.databaseURL)
           console.log('db connected')
       } catch (error) {
        console.log('db connection error:', error.message)
       }
    }
}
