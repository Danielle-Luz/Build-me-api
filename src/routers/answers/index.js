const { Router } = require("express");
const { AnswersController } = require("../../controllers");
const {
  UtilsMiddlewares,
  UsersMiddlewares,
  AnswersMiddlewares,
  PermissionsMiddlewares,
} = require("../../middlewares");
const { newAnswerSchema, updatedAnswerSchema } = require("../../schemas");

const answersRouter = Router();

answersRouter.post(
  "/",
  UtilsMiddlewares.validateSchema(newAnswerSchema),
  UsersMiddlewares.isTokenFilled,
  UsersMiddlewares.validateToken,
  AnswersMiddlewares.doesQuestionExists,
  PermissionsMiddlewares.hasPermissionOnRoute,
  AnswersController.create
);

answersRouter.get(
  "/questions/:questionId",
  UsersMiddlewares.isTokenFilled,
  UsersMiddlewares.validateToken,
  AnswersMiddlewares.doesQuestionExists,
  AnswersMiddlewares.hasPermissionOnRoute,
  AnswersController.getAnswersByQuestionId
);
answersRouter.get(
  "/:id",
  UsersMiddlewares.isTokenFilled,
  UsersMiddlewares.validateToken,
  AnswersMiddlewares.hasPermissionOnRoute,
  AnswersController.getAnswerById
);

answersRouter.patch(
  "/:id",
  UtilsMiddlewares.validateSchema(updatedAnswerSchema),
  UsersMiddlewares.isTokenFilled,
  UsersMiddlewares.validateToken,
  PermissionsMiddlewares.hasPermissionOnRoute,
  AnswersController.update
);

answersRouter.delete(
  "/:id",
  UsersMiddlewares.isTokenFilled,
  UsersMiddlewares.validateToken,
  PermissionsMiddlewares.hasPermissionOnRoute,
  AnswersController.delete
);

module.exports = { answersRouter };
