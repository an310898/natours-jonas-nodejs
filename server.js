const dotenv = require("dotenv");
const app = require("./app");

dotenv.config({ path: "./config.env" });
//* Start server
const port = process.env.PORT;
app.listen(port);
