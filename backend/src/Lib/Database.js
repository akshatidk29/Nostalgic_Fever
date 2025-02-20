import mongoose from "mongoose"

export const ConnectDB = async () => {
    try {
        const Connection = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected : ${Connection.connection.host}`)
    }
    catch (error) {
        console.log(`MongoDB Connection Error`)

    };

}