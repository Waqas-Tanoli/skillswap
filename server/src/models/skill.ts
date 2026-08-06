import mongoose, { Schema, Document } from "mongoose";
import { Types } from "mongoose";
import { ObjectId } from "mongoose";

export interface ISkill extends Document {
  name: string;
  category: string;
  status:
        | "Approved"
        | "Pending"
        | "Rejected";

    requestedBy?: Types.ObjectId;
}

const SkillSchema = new Schema<ISkill>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },
    status: { 
      
      type: String,
      enum: ["Approved", "Pending", "Rejected"],
      default: "Pending",
    },
    requestedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model<ISkill>("Skill", SkillSchema);