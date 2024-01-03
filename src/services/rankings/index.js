const { AppDatasource } = require("../../data-source");
const { Vacancies } = require("../../entities");

class RankingsService {
  static async getUsersWithMoreVacanciesParticipations() {
    return AppDatasource.createQueryBuilder()
      .select("COUNT(vacancies.chosenCandidateId)", "applicationsCount")
      .from(Vacancies, "vacancies")
      .innerJoin("vacancies.chosenCandidate", "candidate")
      .addSelect([
        `candidate."id"`,
        `candidate."firstName"`,
        `candidate."lastName"`,
        `candidate."profilePicture"`,
      ])
      .groupBy(`vacancies."chosenCandidateId"`)
      .addGroupBy("candidate.id")
      .addGroupBy(`candidate."firstName"`)
      .addGroupBy(`candidate."lastName"`)
      .addGroupBy(`candidate."profilePicture"`)
      .orderBy(`"applicationsCount"`, "DESC")
      .getRawMany();
  }
}

module.exports = { RankingsService };
