require("express-async-errors");
const { errorHandler } = require("./errors/errorHandler/index");
const {
  answersRouter,
  learnersRouter,
  permissionsRouter,
  ratingsRouter,
  resourcesRouter,
  rolesRouter,
  usersRouter,
  projectsRouter,
  vacanciesRouter,
  technologiesRouter,
  vacancyRequirementsRouter,
  userSkillsRouter,
  vacancySubscriptionsRouter,
  questionsRouter,
  rankingsRouter,
  testsRouter,
  votationsRouter,
  votesRouter,
  docsRouter,
} = require("./routers/index");
const cors = require("cors");
const express = require("express");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/answers", answersRouter);
app.use("/docs", docsRouter);
app.use("/learners", learnersRouter);
app.use("/permissions", permissionsRouter);
app.use("/projects", projectsRouter);
app.use("/questions", questionsRouter);
app.use("/rankings", rankingsRouter);
app.use("/ratings", ratingsRouter);
app.use("/resources", resourcesRouter);
app.use("/roles", rolesRouter);
app.use("/technologies", technologiesRouter);
app.use("/tests", testsRouter);
app.use("/users", usersRouter);
app.use("/userSkills", userSkillsRouter);
app.use("/vacancies", vacanciesRouter);
app.use("/vacancyRequirements", vacancyRequirementsRouter);
app.use("/vacancySubscriptions", vacancySubscriptionsRouter);
app.use("/votations", votationsRouter);
app.use("/votes", votesRouter);
app.use(errorHandler);

module.exports = { app };
