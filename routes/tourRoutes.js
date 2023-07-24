const express = require("express");

const {
  getAllTours,
  getTour,
  createNewTour,
  updateTour,
  deleteTour,
  checkId,
} = require("../controller/tourController");

const router = express.Router();

//* middleware param to check before go to another middleware
router.param("id", checkId);

router.get("/", getAllTours);
router.post("/", createNewTour);
router.get("/:id", getTour);
router.patch("/:id", updateTour);
router.delete("/:id", deleteTour);

module.exports = router;
