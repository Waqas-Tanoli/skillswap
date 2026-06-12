import mongoose, { Schema, Document, Types } from "mongoose";

export interface INotification extends Document {
  user: Types.ObjectId;

  type: "message" | "swap_request" | "rating" | "system";

  content: string;

  read: boolean;
}

const notificationSchema = new Schema<INotification>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },

    type: {
      type: String,
      enum: ["message", "swap_request", "rating", "system"],
      required: true,
    },

    content: { type: String, required: true },

    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model<INotification>(
  "Notification",
  notificationSchema
);