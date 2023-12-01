import "express-async-errors";
import errorHandler from "./errors/errorHanlder.js";

const cors = require("cors");
const express = require("express");
const app = express();

app.use(cors());
app.use(express.json());
app.use(errorHandler);

export default app;
