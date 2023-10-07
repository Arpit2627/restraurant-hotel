import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    checkin: {
      type: Date,
      required: true,
      unique: true,
    },
    checkout: {
      type: Date,
      required: true,
    },
    people:{
        type:String,
        required:true
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    idProof: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

export default mongoose.model("hotelbookusers", userSchema);
