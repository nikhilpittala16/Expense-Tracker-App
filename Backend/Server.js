const app = require("./App");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const port = 3000;
dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "PASSWORD",
  process.env.DATABASE_PASSWORD
);
mongoose.connect(DB).then(() => {
  console.log("DB connection successful");
});
app.listen(port, () => {
  console.log("Listening.......");
});
