import mongoose, { Schema, Document, Types } from "mongoose";

export interface ISwapRequest extends Document {
  sender: Types.ObjectId;
  receiver: Types.ObjectId;

  skillOffered: Types.ObjectId;
  skillRequested: Types.ObjectId;

  message?: string;

  status: "pending" | "accepted" | "rejected" | "completed";

  createdAt: Date;
  updatedAt: Date;
}

const SwapRequestSchema = new Schema<ISwapRequest>(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    receiver: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    skillOffered: {
      type: Schema.Types.ObjectId,
      ref: "Skill",
      required: true,
    },

    skillRequested: {
      type: Schema.Types.ObjectId,
      ref: "Skill",
      required: true,
    },

    message: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["pending", "accepted", "rejected", "completed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model<ISwapRequest>(
  "SwapRequest",
  SwapRequestSchema
);