import mongoose from "mongoose";

const FoodSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.ObjectId,
      ref: "RoomCategory",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Foods", FoodSchema);