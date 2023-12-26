const { Router } = require("express");
const { VacanciesController } = require("../../controllers");
const { UtilsMiddlewares, UsersMiddlewares } = require("../../middlewares");
const { newVacancySchema, updatedVacancySchema } = require("../../schemas");

const vacanciesRouter = Router();

vacanciesRouter.post(
  "/",
  UtilsMiddlewares.validateSchema(newVacancySchema),
  UsersMiddlewares.isTokenFilled,
  UsersMiddlewares.validateToken,
  VacanciesController.create
);

vacanciesRouter.get("/", VacanciesController.getAll);
vacanciesRouter.get("/:projectId", VacanciesController.getProjectVacancies);

vacanciesRouter.patch(
  "/:id",
  UtilsMiddlewares.validateSchema(updatedVacancySchema),
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
