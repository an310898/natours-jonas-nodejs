const fs = require("fs");
const path = require("path");

const { Tour, isValidObjectId } = require("../models/tour");

const checkId = (req, res, next) => {
  if (isValidObjectId(req.params.id)) {
    return next();
  }
  res.status(400).json({
    status: "fail",
    message: "Invalid ObjectId",
  });
};

const getAllTours = async (req, res) => {
  const tours = await Tour.find();

  res.status(200).json({
    status: "success",
    data: {
      tours,
    },
  });
};

const getTour = async (req, res, next) => {
  try {
    const tour = await Tour.findOne({
      _id: req.params.id,
    }).exec();
    if (tour) {
      return res.status(200).json({
        status: "success",
        data: { tour },
      });
    }
    return res.status(400).json({
      status: "fail",
      message: "Tour not found",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

const createNewTour = async (req, res) => {
  //    const newTour = new Tour({req.body})
  //    newTour.save()
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

const updateTour = async (req, res) => {
  try {
    // console.log(req.body);
    const updatedTour = await Tour.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    // const updatedTour = await Tour.find({ _id: req.params.id });
    res.status(201).json({
      status: "success",
      data: {
        updatedTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
const deleteTour = async (req, res) => {
  try {
    const deletedTour = await Tour.findByIdAndDelete(req.params.id);

    if (deletedTour) {
      return res.status(204).json({
        status: "success",
      });
    }
    return res.status(400).json({
      status: "fail",
      message: "Something went wrong, the tour is not available or deleted",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

const importTour = async (req, res) => {
  await Tour.collection.drop();

  fs.readFile(
    path.join(path.dirname(__dirname), "dev-data", "data", "tours-simple.json"),
    async (err, content) => {
      try {
        const newTour = await Tour.create(JSON.parse(content));
        return res.status(201).json({
          status: "success",
          data: {
            tour: newTour,
          },
        });
      } catch (error) {
        res.status(400).json({
          status: "fail",
          message: error,
        });
      }
    }
  );
};

module.exports = {
  getAllTours,
  getTour,
  updateTour,
  createNewTour,
  deleteTour,
  checkId,
  importTour,
};
