import "express-async-errors";
import errorHandler from "./errors/errorHandler/index.js";
import usersRouter from "./routers/users/index.js";

const cors = require("cors");
const express = require("express");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", usersRouter);

app.use(errorHandler);

export default app;
