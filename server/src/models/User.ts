import mongoose, { Schema, Document,Types } from "mongoose";

export interface IUserSkill {
  skill: Types.ObjectId;
  level: "beginner" | "intermediate" | "advanced";
}
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;

  bio?: string;
  location?: string;
  avatar?: string;

  skillsToTeach:IUserSkill[];
  skillsToLearn:IUserSkill[];
  trustScore: number;

  role: "user" | "admin";

  isVerified: boolean;
  isBanned: boolean;

  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    username  : {
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

    skillsToTeach: [
  {
    skill: {
      type: Schema.Types.ObjectId,
      ref: "Skill",
      required: true,
    },

    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      required: true,
    },
  },
],

  skillsToLearn: [
  {
    skill: {
      type: Schema.Types.ObjectId,
      ref: "Skill",
      required: true,
    },

    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      required: true,
    },
  },
],

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

    isBanned: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUser>("User", userSchema);