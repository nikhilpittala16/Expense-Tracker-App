const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const app = express();
const expensesRouter = require("./Routes/expensesRoutes");
const userRouter = require("./Routes/userRoutes");

///////   middleware   //////////////////////////////////
app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());
app.use(cors());

/////////   Routes  //////////////////////////////////
app.use("/api/expenses", expensesRouter);
app.use("/api/users", userRouter);

module.exports = app;
