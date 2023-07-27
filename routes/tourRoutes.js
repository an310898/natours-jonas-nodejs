const express = require("express");

const tourController = require("../controllers/tourController");

const router = express.Router();

router
  .route("/top-5-cheap")
  .get(tourController.aliasTopCheapTour, tourController.getAllTours);

//* middleware param to check before go to another middleware
router.param("id", tourController.checkId);

router.post("/import-tour", tourController.importTour);

router
  .route("/")
  .get(tourController.getAllTours)
  .post(tourController.createNewTour);
router
  .route("/:id")
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
