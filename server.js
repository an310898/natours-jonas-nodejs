const dotenv = require("dotenv");
const app = require("./app");
const mongooseDb = require("./util/database");

dotenv.config({ path: "./config.env" });

mongooseDb.then(() => {
  console.log("Connect successful to mongoose db");
});
const port = process.env.PORT;
app.listen(port);
