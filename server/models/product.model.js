import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
name: {
 type: String,
 trim: true
 },
description: {
  type: String,
  trim: true
  },
price: {
    type: Number,
    trim: true
    },
quantity: {
      type: Number,
      trim: true
      },
category: {
        type: String,
        trim: true
        },
});

export default mongoose.model('Product', ProductSchema);

