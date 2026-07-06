import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phone: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            required: true,
        },
        photo: {
            url: {
                type: String,
                required: true,
            },
            publicId: {
                type: String,
            },
        },
        dob: {
            type: Date,
            required: true,
        },
        password: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true
    },
)

const User = mongoose.model("User", userSchema);

export default User;