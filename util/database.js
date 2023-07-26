const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const connectString = process.env.DATABASE_CONNECT_STRING.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

const mongooseDB = mongoose.connect(connectString, {
  useNewUrlParser: true,
});

module.exports = mongooseDB;
