const { Router } = require("express");
const { TestsController } = require("../../controllers");
const {
  UsersMiddlewares,
  UtilsMiddlewares,
  TestsMiddlewares,
} = require("../../middlewares");
const { newTestAnswers } = require("../../schemas");

const testsRouter = Router();

testsRouter.post(
  "/evaluate",
  UtilsMiddlewares.validateSchema(newTestAnswers, "body", "parseAsync"),
  UsersMiddlewares.isTokenFilled,
  UsersMiddlewares.validateToken,
  TestsMiddlewares.isQuestionDuplicated,
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
