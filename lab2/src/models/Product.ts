import mongoose, { Schema, model, models } from 'mongoose';

const ProductSchema = new Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

export default models.Product || model('Product', ProductSchema);
