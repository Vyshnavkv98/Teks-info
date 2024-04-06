import { configDotenv } from 'dotenv';
import mongoose from 'mongoose'
configDotenv()

export const connectDb=async()=>{
    await mongoose.connect(process.env.MONGOURL).then(()=>{
        console.log('db connected successfully');
    })
   
}

