import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, );
        console.log(`mongoDB connected successfully to ${conn.connection.host}`);
    } catch (error) {
        console.error(`mongoDB Connection Error: ${error.message}`);
    }
};