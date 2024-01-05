const { Router } = require("express");
const { VotationsController } = require("../../controllers/votations");
const { VotationsMiddlewares } = require("../../middlewares/votations");
const { UtilsMiddlewares, UsersMiddlewares } = require("../../middlewares");
const { newVotationSchema } = require("../../schemas");

const votationsRouter = Router();

votationsRouter.post(
  "/",
  UtilsMiddlewares.validateSchema(newVotationSchema),
  UsersMiddlewares.isTokenFilled,
  UsersMiddlewares.validateToken,
  VotationsMiddlewares.isVotationCreatorEqualToProjectOwner,
  VotationsMiddlewares.doesVacancyExist,
  VotationsController.create
);

votationsRouter.get(
  "/projects/:projectId",
  UsersMiddlewares.isTokenFilled,
  UsersMiddlewares.validateToken,
  VotationsMiddlewares.doesProjectExist,
  VotationsMiddlewares.isVacancyProjectMember,
  VotationsController.getVotationsByProject
);

votationsRouter.delete(
  "/:votationId",
  UsersMiddlewares.isTokenFilled,
  UsersMiddlewares.validateToken,
  VotationsMiddlewares.doesVacancyExist,
  VotationsMiddlewares.isVotationCreatorEqualToProjectOwner,
  VotationsController.delete
);

module.exports = { votationsRouter };
