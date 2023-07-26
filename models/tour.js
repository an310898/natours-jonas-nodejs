const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, " A tour must have a name"],
    unique: true,
  },
  rating: {
    type: Number,
    default: 5,
    min: [1, "A rating must be at least 5"],
    max: [5, "A rating max is 5"],
  },
  price: {
    type: Number,
    required: [true, "a Tour must have a price"],
    min: [0, "Price must be equal or greater than 0"],
  },
});

const Tour = mongoose.model("Tour", tourSchema);

const isValidObjectId = (id) =>
  mongoose.isValidObjectId(id) &&
  String(new mongoose.Types.ObjectId(id)) === id;

module.exports = { Tour, isValidObjectId };
