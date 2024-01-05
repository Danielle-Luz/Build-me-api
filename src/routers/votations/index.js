const { Router } = require("express");
const { VotationsController } = require("../../controllers/votations");
const { VotationsMiddlewares } = require("../../middlewares/votations");

const votationsRouter = Router();

votationsRouter.post(
  "/",
  VotationsMiddlewares.doesVacancyExist,
  VotationsController.create
);

votationsRouter.get(
  "/projects/:projectId",
  VotationsController.getVotationsByProject
);

votationsRouter.patch(
  "/:votationId",
  VotationsMiddlewares.doesVacancyExist,
  VotationsController.update
);

votationsRouter.delete(
  "/:votationId",
  VotationsMiddlewares.doesVacancyExist,
  VotationsController.delete
);

module.exports = { votationsRouter };
