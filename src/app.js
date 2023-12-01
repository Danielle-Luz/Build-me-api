import "express-async-errors";

const cors = require("cors");
const express = require("express");
const app = express();

app.use(cors());
app.use(express.json());

export default app;
