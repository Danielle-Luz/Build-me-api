require("express-async-errors");
const { errorHandler } = require("./errors/errorHandler/index");
const { usersRouter } = require("./routers/index");
const cors = require("cors");
const express = require("express");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", usersRouter);

app.use(errorHandler);

module.exports = { app };
