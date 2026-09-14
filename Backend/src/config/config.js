import dotenv from 'dotenv'

dotenv.config()

if (!process.env.MONGO_URI) {
    console.log('MONGO_URI is not defined');
    process.exit(1)
}

if (!process.env.JWT_SECRET) {
    console.log('JWT_SECRET is not defined');
    process.exit(1)
}

if (!process.env.GEMINI_API_KEY) {
    console.log('GEMINI_API_KEY is not defined');
    process.exit(1)
}

const config = {
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    GEMINI_API_KEY: process.env.GEMINI_API_KEY
}

export default config
