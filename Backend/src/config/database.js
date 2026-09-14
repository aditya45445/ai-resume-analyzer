import mongoose from "mongoose";
import config from "./config.js";

async function connectDB() {

    await mongoose.connect(config.MONGO_URI)
        .then(() => {
            console.log('database connected');
        })
        .catch((error) => {
            console.log(error);
        })
}

export default connectDB