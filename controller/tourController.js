const fs = require("fs");
const path = require("path");

const tours = JSON.parse(
  fs.readFileSync(
    path.join(path.dirname(__dirname), "dev-data", "data", "tours-simple.json"),
    (err, content) => content
  )
);

const checkId = (req, res, next, val) => {
  if (!tours.find((x) => x.id === +val)) {
    return res
      .status(404)
      .json({ status: "Fail", message: "Not found at middleware" });
  }
  next();
};

const checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res
      .status(400)
      .json({ status: "Fail", message: "Missing name or price" });
  }
  next();
};

const getAllTours = (req, res) => {
  res
    .status(200)
    .json({ status: "success", time: req.requestTimer, data: { tours } });
};

const getTour = (req, res) => {
  const tour = tours.find((x) => +x.id === +req.params.id);
  return res.status(200).json({ status: "success", data: { tour } });
};

const createNewTour = (req, res) => {
  const id = tours[tours.length - 1].id + 1;
  const newTours = { id: id, ...req.body };
  tours.push(newTours);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    () => {
      res.status(201).json({ status: "success", data: { tour: newTours } });
    }
  );
};

const updateTour = (req, res) => {
  const tourIndex = tours.findIndex((x) => +x.id === +req.params.id);
  if (tourIndex < 0) {
    return res
      .status(404)
      .json({ status: "failed", message: "Tour Id not found!" });
  }
  const tourUpdated = { id: tours[tourIndex].id, ...req.body };
  tours[tourIndex] = tourUpdated;

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (!err) {
        return res
          .status(200)
          .json({ status: "success", data: { tour: tourUpdated } });
      }
      return res.status(404).json({ status: "failed" });
    }
  );
};
const deleteTour = (req, res) => {
  const newArrTour = tours.filter((x) => +x.id !== +req.params.id);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(newArrTour),
    (err) => {
      if (!err) {
        return res.status(204).json({ status: "success", data: null });
      }
      return res.status(404).json({ status: "failed" });
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
  checkBody,
};
