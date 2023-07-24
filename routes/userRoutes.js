const express = require("express");

const userController = require("../controller/userController");
const app = express();

app
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createNewUser);
app.route("/:id").get(userController.getUser);
//   .patch(updateUser)
//   .delete(deleteUser);

module.exports = app;
