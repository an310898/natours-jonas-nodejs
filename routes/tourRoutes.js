const express = require("express");

const {
  getAllTours,
  getTour,
  createNewTour,
  updateTour,
  deleteTour,
} = require("../controller/tourController");

const router = express.Router();

router.get("/", getAllTours);
router.post("/", createNewTour);
router.get("/:id", getTour);
router.patch("/:id", updateTour);
router.delete("/:id", deleteTour);

module.exports = router;
