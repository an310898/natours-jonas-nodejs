const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const app = require("./app");
const mongooseDb = require("./util/database");

mongooseDb.then(() => {
  console.log("Connect successful to mongoose db");
});
const port = process.env.PORT;
app.listen(port);
