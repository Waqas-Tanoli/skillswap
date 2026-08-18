import mongoose, {
  Schema,
  Document,
  Types,
} from "mongoose";

export interface IRating extends Document {
  swap: Types.ObjectId;
  rater: Types.ObjectId;
  ratedUser: Types.ObjectId;

  rating: number;
  review?: string;

  createdAt: Date;
  updatedAt: Date;
}

const RatingSchema =
  new Schema<IRating>(
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
        maxlength: 1000,
      },
    },

    {
      timestamps: true,
    }
  );

/**
 * Prevent duplicate rating
 * from the same user for the same swap.
 */
RatingSchema.index(
  {
    swap: 1,
    rater: 1,
  },
  {
    unique: true,
  }
);

/**
 * Improve queries for profile ratings.
 */
RatingSchema.index({
  ratedUser: 1,
  createdAt: -1,
});

export default mongoose.model<IRating>(
  "Rating",
  RatingSchema
);