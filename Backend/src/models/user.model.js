import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'username is required'],
        unique: [true, 'username must be unique']
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: [true, 'email must be unique'],
        lowercase: true,
        trim: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'please provide a valid email address']
    },
    password: {
        type: String,
        required: [true, 'password must be required'],
        min: [8, 'password must be at least 8 characters long']
    }
}, {
    timestamps: true
})

userSchema.pre('save', async function () {
    if (this.isModified('password')) {
        return;
    }

    this.password = await bcrypt.hash(this.password, 10);
    return;
})

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

const userModel = mongoose.model('user', userSchema)

export default userModel