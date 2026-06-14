import mongoose, { Schema, Document, Types } from "mongoose";

export interface IRating extends Document {
  swap: Types.ObjectId;
  rater: Types.ObjectId;
  ratedUser: Types.ObjectId;

  rating: number; 
  review?: string;

  createdAt: Date;
  updatedAt: Date;
}

const RatingSchema = new Schema<IRating>(
  {
    swap: {
      type: Schema.Types.ObjectId,
      ref: "SwapRequest",
      required: true,
    },

    rater: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    ratedUser: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    review: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

// Prevent duplicate rating per swap per user
RatingSchema.index({ swap: 1, rater: 1 }, { unique: true });

export default mongoose.model<IRating>("Rating", RatingSchema);