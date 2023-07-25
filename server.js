const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = require("./app");

dotenv.config({ path: "./config.env" });

const db = process.env.DATABASE_CONNECT_STRING.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(db, {
    useNewUrlParser: true,
  })
  .then((connect) => {
    console.log(connect.connections);
  });

const port = process.env.PORT;
app.listen(port);
