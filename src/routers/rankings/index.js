const { Router } = require("express");
const { RankingsController } = require("../../controllers");

const rankingsRouter = Router();

rankingsRouter.get(
  "/vacancies/participations",
  RankingsController.getUsersWithMoreVacanciesParticipations
);

rankingsRouter.get(
  "/ratings/authored",
  RankingsController.getUsersWithMoreRatingsMade
);

rankingsRouter.get(
  "/ratings/average",
  RankingsController.getUsersWithBiggestAverageRatings
);

rankingsRouter.get(
  "/learners/subscriptions",
  RankingsController.getUsersWithMoreLearnerSubscriptions
);

rankingsRouter.get(
  "/tests/scores",
  RankingsController.getUsersWithBiggestTestScores
);

rankingsRouter.get(
  "/userSkills/scores",
  RankingsController.getUsersWithBestSkillScores
);

module.exports = { rankingsRouter };
