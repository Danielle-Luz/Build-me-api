const { Router } = require("express");
const { RankingsController } = require("../../controllers");

const rankingsRouter = Router();

rankingsRouter.get(
  "/moreParticipations",
  RankingsController.getUsersWithMoreVacanciesParticipations
);

module.exports = { rankingsRouter };
