const { Router } = require("express");
const { VotesController } = require("../../controllers");

const votesRouter = Router();

votesRouter.post("/", VotesController.create);

module.exports = { votesRouter };
