const { Router } = require("express");
const { TestsController } = require("../../controllers");
const {
  UsersMiddlewares,
  TestsMiddlewares,
  UtilsMiddlewares,
} = require("../../middlewares");
const { newTestAnswers } = require("../../schemas");

const testsRouter = Router();

testsRouter.post(
  "/evaluate",
  UtilsMiddlewares.validateSchema(newTestAnswers),
  UsersMiddlewares.isTokenFilled,
  UsersMiddlewares.validateToken,
  TestsController.evaluateAnswersAndGetTestScore
);

testsRouter.get(
  "/:id",
  UsersMiddlewares.isTokenFilled,
  UsersMiddlewares.validateToken,
  TestsController.getTestById
);

testsRouter.get(
  "/technologies/:technologyId",
  UsersMiddlewares.isTokenFilled,
  UsersMiddlewares.validateToken,
  TestsController.getTestsByTechnologyId
);

testsRouter.get(
  "/users/:userId",
  UsersMiddlewares.isTokenFilled,
  UsersMiddlewares.validateToken,
  TestsController.getTestsByUser
);

testsRouter.get(
  "/users/:userId/technologies/:technologyId",
  UsersMiddlewares.isTokenFilled,
  UsersMiddlewares.validateToken,
  TestsController.getTestByUserAndTechnology
);

module.exports = { testsRouter };
