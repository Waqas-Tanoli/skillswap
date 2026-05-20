import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  bio?: string;
  location?: string;
  skillsToTeach: string[];
  skillsToLearn: string[];
  avatar?: string;
  trustScore: number;
  role: "user" | "admin";
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },

    email: { type: String, required: true, unique: true, lowercase: true },

    password: { type: String, required: true, minlength: 6 },

    bio: { type: String, default: "" },

    location: { type: String, default: "" },

    skillsToTeach: [{ type: String }],
    skillsToLearn: [{ type: String }],

    avatar: { type: String },

    trustScore: { type: Number, default: 0 },

    role: { type: String, enum: ["user", "admin"], default: "user" },

    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export default mongoose.model<IUser>("User", userSchema);
