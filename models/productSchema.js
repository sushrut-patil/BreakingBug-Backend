const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    productName: {
      type: String,
    },
    price: {
      mrp: {
        type: Number,
      },
      cost: {
        type: Number,
      },
      discountPercent: {
        type: Number,
      },
    },
    subcategory: {
      type: String,
    },
    productImage: {
      type: String,
    },
    category: {
      type: String,
    },
    description: {
      type: String,
    },
    tagline: {
      type: String,
    },
    quantity: {
      type: Number,
      default: 1, //changed default from 45 to 1
    },
    reviews: [
      {
        rating: {
          type: Number,
        },
        comment: {
          type: String,
        },
        reviewer: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "CUSTOMERS",
        },
        date: {
          type: Date,
          // DATE IS NOT DEFINED WITH DEFAULT VALUES
          default: Date.now,
        },
      },
    ],
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
    },
  },
  { timestamps: false }
);

// module.exports = mongoose.mongoose("product", productSchema);
// here model should be used instead of mongoose
module.exports = mongoose.model("Product", productSchema);
