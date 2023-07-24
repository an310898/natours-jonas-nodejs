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

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
