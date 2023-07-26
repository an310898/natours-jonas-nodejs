const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const { Tour } = require("../../models/tour");

dotenv.config({ path: "./config.env" });

const connectString = process.env.DATABASE_CONNECT_STRING.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(connectString, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("connect db success!");
  });

const importData = async () => {
  await Tour.deleteMany({});
  fs.readFile(`${__dirname}/tours-simple.json`, async (err, content) => {
    if (!err) {
      await Tour.create(JSON.parse(content));
      console.log("import success!");
      process.exit();
    }
  });
};

if (process.argv[2] === "--import") {
  importData();
}

//* run this comment to import
//* node dev-data/data/import-data --import
