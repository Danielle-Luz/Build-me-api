require("express-async-errors");
const { errorHandler } = require("./errors/errorHandler/index");
const {
  permissionsRouter,
  ratingsRouter,
  resourcesRouter,
  rolesRouter,
  usersRouter,
  projectsRouter,
} = require("./routers/index");
const cors = require("cors");
const express = require("express");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/permissions", permissionsRouter);
app.use("/projects", projectsRouter);
app.use("/ratings", ratingsRouter);
app.use("/resources", resourcesRouter);
app.use("/roles", rolesRouter);
app.use("/users", usersRouter);

app.use(errorHandler);

module.exports = { app };
