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
  PermissionsMiddlewares.hasPermissionOnRoute,
  QuestionsMiddlewares.doesTechnologyExists,
  QuestionsController.create
);

questionsRouter.get(
  "/",
  QuestionsMiddlewares.hasPermissionOnRoute,
  QuestionsController.getAllQuestions
);
questionsRouter.get(
  "/technologies/:technologyId",
  QuestionsMiddlewares.hasPermissionOnRoute,
  QuestionsMiddlewares.doesTechnologyExists,
  QuestionsController.getQuestionsByTechnologyId
);
questionsRouter.get(
  "/random/technologies/:technologyId",
  QuestionsMiddlewares.hasPermissionOnRoute,
  QuestionsMiddlewares.doesTechnologyExists,
  QuestionsController.getRandomQuestionsByTechnologyId
);
questionsRouter.get(
  "/:id",
  QuestionsMiddlewares.hasPermissionOnRoute,
  QuestionsController.getQuestionById
);

questionsRouter.patch(
  "/:id",
  UtilsMiddlewares.validateSchema(updatedQuestionSchema),
  PermissionsMiddlewares.hasPermissionOnRoute,
  QuestionsMiddlewares.doesTechnologyExists,
  QuestionsController.update
);

questionsRouter.delete(
  "/:id",
  PermissionsMiddlewares.hasPermissionOnRoute,
  QuestionsController.delete
);

module.exports = { questionsRouter };
