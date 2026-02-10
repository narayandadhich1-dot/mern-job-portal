import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      // Mongoose built-in regex validation for email
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      // Note: We don't use match here because we store hashed passwords
    },
    phoneNumber: {
      type: String, // Changed to String to use match and handle leading zeros
      required: [true, "Phone number is required"],
      match: [/^[0-9]{10}$/, 'Phone number must be exactly 10 digits']
    },
    role: {
      type: String,
      enum: ["student", "recruiter"],
      required: [true, "Role is required"],
    },
    profile: {
      bio: { type: String, default: "" },
      skills: [{ type: String }],
      resume: { type: String, default: "" },
      resumeOriginalName: { type: String, default: "" },
      company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
      profilePicture: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);