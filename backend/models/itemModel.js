import mongoose from "mongoose";

const itemSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    colour: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String, 
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const item = mongoose.model("item", itemSchema);
