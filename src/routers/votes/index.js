const { Router } = require("express");
const { VotesController } = require("../../controllers");
const {
  UtilsMiddlewares,
  UsersMiddlewares,
  VotesMiddlewares,
} = require("../../middlewares");
const { newVoteSchema } = require("../../schemas");

const votesRouter = Router();

votesRouter.post(
  "/",
  UtilsMiddlewares.validateSchema(newVoteSchema),
  UsersMiddlewares.isTokenFilled,
  UsersMiddlewares.validateToken,
  VotesMiddlewares.doesVotationExist,
  VotesMiddlewares.isVotationOpen,
  VotesMiddlewares.isVotingInProjectColleague,
  VotesMiddlewares.didUserVotedOnce,
  VotesController.create
);

votesRouter.get(
  "/votations/:votationId",
  UsersMiddlewares.isTokenFilled,
  UsersMiddlewares.validateToken,
  VotesMiddlewares.doesVotationExist,
  VotesController.getUserVote
);

votesRouter.delete(
  "/:voteId",
  UsersMiddlewares.isTokenFilled,
  UsersMiddlewares.validateToken,
  VotesMiddlewares.isVoteFromLoggedUser,
  VotesController.delete
);

module.exports = { votesRouter };
