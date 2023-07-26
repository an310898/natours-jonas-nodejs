const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, " A tour must have a name"],
    unique: true,
    trim: true,
  },
  duration: {
    type: Number,
    required: [true, "A tour must have duration"],
  },
  maxGroupSize: {
    type: Number,
    required: [true, "A tour must have group size"],
  },
  difficulty: {
    type: String,
    required: [true, "A tour must have a difficulty"],
  },
  ratingsAverage: {
    type: Number,
    default: 5,
    min: [1, "A rating must be at least 5"],
    max: [5, "A rating max is 5"],
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, "a Tour must have a price"],
    min: [0, "Price must be equal or greater than 0"],
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true,
    required: [true, "A tour must have a summary"],
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, "A tour must have a cover image"],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  StartDate: [Date],
});

const Tour = mongoose.model("Tour", tourSchema);

const isValidObjectId = (id) =>
  mongoose.isValidObjectId(id) &&
  String(new mongoose.Types.ObjectId(id)) === id;

module.exports = { Tour, isValidObjectId };
