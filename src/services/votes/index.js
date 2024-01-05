const { AppDatasource } = require("../../data-source");
const { Votes } = require("../../entities");

class VotesService {
  static async create(newVote) {
    const createdVote = await AppDatasource.createQueryBuilder()
      .insert()
      .into(Votes, "votes")
      .values(newVote)
      .returning("*")
      .execute();

    return createdVote.generatedMaps[0];
  }
}

module.exports = { VotesService };
