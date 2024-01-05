const { Router } = require("express");
const { VotationsController } = require("../../controllers/votations");

const votationsRouter = Router();

votationsRouter.post("/", VotationsController.create);

votationsRouter.get(
  "/projects/:projectId",
  VotationsController.getVotationsByProject
);

votationsRouter.patch("/:votationId", VotationsController.update);

votationsRouter.delete("/:votationId", VotationsController.delete);

module.exports = { votationsRouter };
