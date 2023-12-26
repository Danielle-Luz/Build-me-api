const { Router } = require("express");
const { LearnersController } = require("../../controllers");
const { UtilsMiddlewares, UsersMiddlewares } = require("../../middlewares");
const { newLearnerSchema, updatedLearnerSchema } = require("../../schemas");

const learnersRouter = Router();

learnersRouter.post(
  "/",
  UtilsMiddlewares.validateSchema(newLearnerSchema),
  UsersMiddlewares.isTokenFilled,
  UsersMiddlewares.validateToken,
  LearnersController.create
);

learnersRouter.get("/", LearnersController.getAll);
learnersRouter.get("/:id", LearnersController.getById);

learnersRouter.patch(
  "/:id",
  UsersMiddlewares.isTokenFilled,
  UsersMiddlewares.validateToken,
  UtilsMiddlewares.validateSchema(updatedLearnerSchema),
  LearnersController.update
);

learnersRouter.delete(
  "/:id",
  UsersMiddlewares.isTokenFilled,
  UsersMiddlewares.validateToken,
  LearnersController.delete
);

module.exports = { learnersRouter };
