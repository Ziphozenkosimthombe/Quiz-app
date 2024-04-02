import mongoose from 'mongoose';
import dotenv from 'dotenv';


const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_STRING)
        console.log(`MongoDB Connected: ${conn.connection.host}`)

    }catch(err){
        console.error(`Error: ${err.message}`)
        process.exit(1)
    }
}
export default connectDB;