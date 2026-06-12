import mongoose, { Schema, Document, Types } from "mongoose";

export interface IMessage extends Document {
  sender: Types.ObjectId;
  receiver: Types.ObjectId;
  swapRequest: Types.ObjectId;
  content: string;
  read: boolean;
}

const messageSchema = new Schema<IMessage>(
  {
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },

    receiver: { type: Schema.Types.ObjectId, ref: "User", required: true },

    swapRequest: { type: Schema.Types.ObjectId, ref: "SwapRequest" },

    content: { type: String, required: true },

    read: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export default mongoose.model<IMessage>("Message", messageSchema);
