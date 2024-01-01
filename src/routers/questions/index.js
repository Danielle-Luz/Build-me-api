const { Router } = require("express");
const { QuestionsController } = require("../../controllers");
const {
  UtilsMiddlewares,
  UsersMiddlewares,
  QuestionsMiddlewares,
  PermissionsMiddlewares,
} = require("../../middlewares");
const { newQuestionSchema, updatedQuestionSchema } = require("../../schemas");

const questionsRouter = Router();

questionsRouter.post(
  "/",
  UtilsMiddlewares.validateSchema(newQuestionSchema),
  UsersMiddlewares.isTokenFilled,
  UsersMiddlewares.validateToken,
  PermissionsMiddlewares.hasPermissionOnRoute,
  QuestionsMiddlewares.doesTechnologyExists,
  QuestionsController.create
);

questionsRouter.get(
  "/",
  UsersMiddlewares.isTokenFilled,
  UsersMiddlewares.validateToken,
  QuestionsMiddlewares.hasPermissionOnRoute,
  QuestionsController.getAllQuestions
);
questionsRouter.get(
  "/technologies/:technologyId",
  UsersMiddlewares.isTokenFilled,
  UsersMiddlewares.validateToken,
  QuestionsMiddlewares.hasPermissionOnRoute,
  QuestionsMiddlewares.doesTechnologyExists,
  QuestionsController.getQuestionsByTechnologyId
);
questionsRouter.get(
  "/random/technologies/:technologyId",
  UsersMiddlewares.isTokenFilled,
  UsersMiddlewares.validateToken,
  QuestionsMiddlewares.hasPermissionOnRoute,
  QuestionsMiddlewares.doesTechnologyExists,
  QuestionsController.getRandomQuestionsByTechnologyId
);
questionsRouter.get(
  "/:id",
  UsersMiddlewares.isTokenFilled,
  UsersMiddlewares.validateToken,
  QuestionsMiddlewares.hasPermissionOnRoute,
  QuestionsController.getQuestionById
);

questionsRouter.patch(
  "/:id",
  UtilsMiddlewares.validateSchema(updatedQuestionSchema),
  UsersMiddlewares.isTokenFilled,
  UsersMiddlewares.validateToken,
  PermissionsMiddlewares.hasPermissionOnRoute,
  QuestionsMiddlewares.doesTechnologyExists,
  QuestionsController.update
);

questionsRouter.delete(
  "/:id",
  UsersMiddlewares.isTokenFilled,
  UsersMiddlewares.validateToken,
  PermissionsMiddlewares.hasPermissionOnRoute,
  QuestionsController.delete
);

module.exports = { questionsRouter };
