import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;

  bio?: string;
  location?: string;
  avatar?: string;

  skillsToTeach: string[];
  skillsToLearn: string[];

  trustScore: number;

  role: "user" | "admin";

  isVerified: boolean;

  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    bio: {
      type: String,
      default: "",
    },

    location: {
      type: String,
      default: "",
    },

    avatar: {
      type: String,
      default: "",
    },

    skillsToTeach: {
      type: [String],
      default: [],
    },

    skillsToLearn: {
      type: [String],
      default: [],
    },

    trustScore: {
      type: Number,
      default: 0,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUser>("User", userSchema);