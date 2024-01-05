const { AppDatasource } = require("../../data-source");
const { Votes } = require("../../entities");
const { RecordNotFoundError } = require("../../errors");
const { VacanciesService } = require("../vacancies");
const { VotationsService } = require("../votations");

class VotesService {
  static async create(newVote, relatedProjectId) {
    const createdVote = await AppDatasource.createQueryBuilder()
      .insert()
      .into(Votes)
      .values(newVote)
      .returning("*")
      .execute();

    const wasVacancyMemberRemovedAfterVote =
      await VotesService.wasVacancyMemberRemovedAfterVote(
        newVote.votationId,
        relatedProjectId
      );

    const voteData = createdVote.generatedMaps[0];
    voteData.wasUserBanned = wasVacancyMemberRemovedAfterVote;

    return voteData;
  }

  static async wasVacancyMemberRemovedAfterVote(votationId, relatedProjectId) {
    const { votesCount } = await VotesService.getVotationVotesCount(votationId);
    const { membersCount } =
      await VacanciesService.getRelatedProjectMembersCount(relatedProjectId);

    const halfMembersCount = parseInt(membersCount / 2) + 1;
    const hasMajorityVoted = votesCount >= halfMembersCount;

    let wasVacancyMemberRemovedAfterVote = false;

    if (hasMajorityVoted) {
      const updatedVacancy = { chosenCandidateId: null };
      const updatedVotation = { isOpen: false };

      const votationFound = await VotationsService.getVotationById(votationId);

      await VacanciesService.update(votationFound.vacancyId, updatedVacancy);
      await VotationsService.update(votationId, updatedVotation);

      wasVacancyMemberRemovedAfterVote = true;
    }

    return wasVacancyMemberRemovedAfterVote;
  }

  static async getUserVotesCount(voterId, votationId) {
    return AppDatasource.createQueryBuilder()
      .select("COUNT(votes.votationId)", "userVotesCount")
      .from(Votes, "votes")
      .where("votes.voterId = :voterId", { voterId })
      .andWhere("votes.votationId = :votationId", { votationId })
      .getRawOne();
  }

  static async getVotationVotesCount(votationId) {
    return AppDatasource.createQueryBuilder()
      .select("COUNT(votes.votationId)", "votesCount")
      .from(Votes, "votes")
      .where("votes.votationId = :votationId", { votationId })
      .getRawOne();
  }

  static async getUserVote(voterId, votationId) {
    return AppDatasource.createQueryBuilder()
      .select("votes.id")
      .from(Votes, "votes")
      .where("votes.voterId = :voterId", { voterId })
      .andWhere("votes.votationId = :votationId", { votationId })
      .getMany();
  }

  static async getVoteById(voteId) {
    const foundVote = await AppDatasource.createQueryBuilder()
      .select(["votes.id", "votes.voterId"])
      .from(Votes, "votes")
      .where("votes.id = :voteId", { voteId })
      .getOne();

    if (!foundVote) {
      throw new RecordNotFoundError("No vote with the informed id was found");
    }

    return foundVote;
  }

  static async delete(voteId) {
    const deletedVote = await AppDatasource.createQueryBuilder()
      .delete()
      .from(Votes, "votes")
      .where("votes.id = :voteId", { voteId })
      .execute();

    const wasVoteDeleted = deletedVote.affected != 0;

    if (!wasVoteDeleted) {
      throw new RecordNotFoundError("No vote with the informed id was found");
    }
  }
}

module.exports = { VotesService };
