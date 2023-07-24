const express = require("express");
const fs = require("fs");
const app = express();

//* use middleware to read respond from Post body request
app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(
    `${__dirname}/dev-data/data/tours-simple.json`,
    (err, content) => content
  )
);

app.get("/api/v1/tours", (req, res) => {
  res.status(200).json({ status: "success", data: { tours } });
});

app.get("/api/v1/tours/:id", (req, res) => {
  const tour = tours.find((x) => +x.id === +req.params.id);
  if (tour) {
    return res.status(200).json({ status: "success", data: { tour } });
  }
  return res.status(404).json({ status: "Not found" });
});

app.post("/api/v1/tours", (req, res) => {
  //   console.log(req.body);
  const id = tours[tours.length - 1].id + 1;
  const newTours = { id: id, ...req.body };
  tours.push(newTours);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({ status: "success", data: { tour: newTours } });
    }
  );
});

app.patch("/api/v1/tours/:id", (req, res) => {
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
});

app.delete("/api/v1/tours/:id", (req, res) => {
  const tour = tours.find((x) => +x.id === +req.params.id);
  if (!tour) {
    return res
      .status(404)
      .json({ status: "failed", message: "Tour Id not found!" });
  }
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
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
