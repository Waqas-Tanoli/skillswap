import mongoose, { Schema, Document } from "mongoose";

export interface ISkill extends Document {
  name: string;
  category: string;
}

const skillSchema = new Schema<ISkill>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    category: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

export default mongoose.model<ISkill>("Skill", skillSchema);
