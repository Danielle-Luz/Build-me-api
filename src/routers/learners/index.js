const { Router } = require("express");
const { LearnersController } = require("../../controllers");
const {
  UtilsMiddlewares,
  UsersMiddlewares,
  LearnersMiddlewares,
} = require("../../middlewares");
const { newLearnerSchema } = require("../../schemas");

const learnersRouter = Router();

learnersRouter.post(
  "/",
  UtilsMiddlewares.validateSchema(newLearnerSchema),
  UsersMiddlewares.isTokenFilled,
  UsersMiddlewares.validateToken,
  LearnersMiddlewares.hasPermissionOnRoute,
  LearnersMiddlewares.doesVacancyExists,
  LearnersController.create
);

learnersRouter.get("/", LearnersController.getAll);
learnersRouter.get("/:id", LearnersController.getById);

learnersRouter.delete(
  "/:id",
  UsersMiddlewares.isTokenFilled,
  UsersMiddlewares.validateToken,
  LearnersMiddlewares.hasPermissionOnRoute,
  LearnersController.delete
);

module.exports = { learnersRouter };
