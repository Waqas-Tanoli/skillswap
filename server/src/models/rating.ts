import mongoose, { Schema, Document, Types } from "mongoose";

export interface IRating extends Document {
  from: Types.ObjectId;
  to: Types.ObjectId;
  swapRequest: Types.ObjectId;

  rating: number;
  review?: string;
}

const ratingSchema = new Schema<IRating>(
  {
    from: { type: Schema.Types.ObjectId, ref: "User", required: true },

    to: { type: Schema.Types.ObjectId, ref: "User", required: true },

    swapRequest: { type: Schema.Types.ObjectId, ref: "SwapRequest" },

    rating: { type: Number, required: true, min: 1, max: 5 },

    review: { type: String, default: "" },
  },
  { timestamps: true },
);

export default mongoose.model<IRating>("Rating", ratingSchema);
