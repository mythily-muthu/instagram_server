import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true, min: 3, max: 50, },
        lastName: { type: String, required: true, min: 3, max: 50, },
        email: { type: String, unique: true, required: true, max: 40, },
        password: { type: String, required: true, min: 5, max: 40, unique: true, },
        picturePath: { type: String, default: "", },
        friends: { type: Array, default: [], },
        location: String,
        occupation: String,
        viewedProfiles: Number,
        impressions: Number
    },
    { timestamps: true }
);


const User = mongoose.model("User", UserSchema);
export default User;


