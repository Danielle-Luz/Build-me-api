const {
  AssociationLimitReachedError,
  NoPermissionError,
} = require("../../errors");
const {
  VotationsService,
  VacanciesService,
  VotesService,
} = require("../../services");

class VotesMiddlewares {
  static async doesVotationExist(request, response, nextMiddleware) {
    const isCreating = request.method == "POST";
    let votationId;

    if (isCreating) {
      votationId = request.validatedData.votationId;
    } else {
      votationId = request.params.votationId;
    }

    const foundVotation = await VotationsService.getVotationById(votationId);
    request.foundVotation = foundVotation;

    return nextMiddleware();
  }

  static async isVotingInProjectColleague(request, response, nextMiddleware) {
    const foundVacancy = await VacanciesService.getVacancyById(
      request.foundVotation.vacancyId
    );

    request.foundVacancy = foundVacancy;

    const projectId = foundVacancy.projectId;
    const projectColleagueId = foundVacancy.chosenCandidateId;
    const voterId = request.loggedUser.id;

    const projectMembers = await VacanciesService.getProjectColleagues(
      projectId,
      [projectColleagueId, voterId]
    );

    const isVotingInProjectColleague = projectMembers.length >= 2;

    if (!isVotingInProjectColleague) {
      throw new NoPermissionError(
        "A user can only vote for another user if both are members of the same project"
      );
    }

    return nextMiddleware();
  }

  static async didUserVotedOnce(request, response, nextMiddleware) {
    const voterId = request.loggedUser.id;
    const { votationId } = request.validatedData;
    const { userVotesCount } = await VotesService.getUserVotesCount(
      voterId,
      votationId
    );

    const didUserAlreadyVote = userVotesCount >= 1;

    if (didUserAlreadyVote) {
      throw new AssociationLimitReachedError(
        "Users can only vote once per votation"
      );
    }

    return nextMiddleware();
  }

  static async isVoteFromLoggedUser(request, response, nextMiddleware) {
    const { voteId: deletedVote } = request.params;
    const { voterId } = await VotesService.getVoteById(deletedVote);
    const deletingUserId = request.loggedUser.id;
    console.log("\nvoter id", voterId);
    const isVoteFromLoggedUser = deletingUserId == voterId;

    if (!isVoteFromLoggedUser) {
      throw new NoPermissionError("A user can't delete votes from other users");
    }

    return nextMiddleware();
  }
}

module.exports = { VotesMiddlewares };
