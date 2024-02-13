import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        // unique: true, // optional, if you want to enforce uniqueness
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50,
    },
});

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: "User",
        required: true,
    },
    balance: {
        type: Number,
        required: true,
    },
});

const Account = mongoose.model("Account", accountSchema);
const User = mongoose.model("User", userSchema);

export { Account, User };
