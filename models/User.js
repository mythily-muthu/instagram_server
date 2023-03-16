import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstName: { required: true, type: String, min: 3, max: 50 },
    lastName: { required: true, type: String, min: 3, max: 50 },
    email: { required: true, unique: true, max: 40 },
    password: { required: true, type: String, min: 5, max: 10 },
    picturePath: { type: String, default: "" },
    friends: { type: [] },
    location: { required: true, type: String },
    occupation: { required: true, type: String },
    viewedProfiles: Number,
    impressions: Number
},
    { timestamps: true });


const User = mongoose.model("User", UserSchema);
export default User;