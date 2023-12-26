const { Router } = require("express");
const { VacanciesController } = require("../../controllers");
const { UtilsMiddlewares, UsersMiddlewares } = require("../../middlewares");

const vacanciesRouter = Router();

vacanciesRouter.post(
  "/",
  UtilsMiddlewares.validateSchema(),
  UsersMiddlewares.isTokenFilled,
  UsersMiddlewares.validateToken,
  VacanciesController.create
);

vacanciesRouter.get("/", VacanciesController.getAll);
vacanciesRouter.get("/:projectId", VacanciesController.getProjectVacancies);

vacanciesRouter.patch(
  "/:id",
  UtilsMiddlewares.validateSchema(),
  UsersMiddlewares.isTokenFilled,
  UsersMiddlewares.validateToken,
  VacanciesController.update
);

vacanciesRouter.delete(
  "/:id",
  UsersMiddlewares.isTokenFilled,
  UsersMiddlewares.validateToken,
  VacanciesController.delete
);
