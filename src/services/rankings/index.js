const { AppDatasource } = require("../../data-source");
const {
  Vacancies,
  Ratings,
  Learners,
  Tests,
  UserSkills,
} = require("../../entities");

class RankingsService {
  static async getUsersWithMoreVacanciesParticipations({
    page = 0,
    quantity = 10,
  }) {
    const ranking = await AppDatasource.createQueryBuilder()
      .select("COUNT(vacancies.chosenCandidateId)", "applicationsCount")
      .from(Vacancies, "vacancies")
      .innerJoin("vacancies.chosenCandidate", "candidate")
      .addSelect(`candidate."id"`, "userId")
      .addSelect([
        `candidate."firstName"`,
        `candidate."lastName"`,
        `candidate."profilePicture"`,
      ])
      .groupBy([
        `vacancies."chosenCandidateId"`,
        "candidate.id",
        `candidate."firstName"`,
        `candidate."lastName"`,
        `candidate."profilePicture"`,
      ])
      .orderBy(`"applicationsCount"`, "DESC")
      .skip(page * quantity)
      .take(quantity)
      .getRawMany();

    return { page, quantity: ranking.length, ranking };
  }

  static async getUsersWithMoreRatingsMade({ page = 0, quantity = 10 }) {
    const ranking = await AppDatasource.createQueryBuilder()
      .select("COUNT(*)", "ratingsMadeCount")
      .from(Ratings, "ratings")
      .innerJoin("ratings.author", "author")
      .addSelect(`author."id"`, "userId")
      .addSelect([
        `author."id"`,
        `author."firstName"`,
        `author."lastName"`,
        `author."profilePicture"`,
      ])
      .groupBy([
        `ratings."authorId"`,
        "author.id",
        `author."firstName"`,
        `author."lastName"`,
        `author."profilePicture"`,
      ])
      .orderBy(`"ratingsMadeCount"`, "DESC")
      .skip(page * quantity)
      .take(quantity)
      .getRawMany();

    return { page, quantity: ranking.length, ranking };
  }

  static async getUsersWithBiggestAverageRatings({ page = 0, quantity = 10 }) {
    const ranking = await AppDatasource.createQueryBuilder()
      .select("ROUND(AVG(ratings.grade), 2)", "averageRating")
      .from(Ratings, "ratings")
      .innerJoin("ratings.ratedRecipient", "recipient")
      .addSelect(`recipient."id"`, "userId")
      .addSelect([
        `recipient."firstName"`,
        `recipient."lastName"`,
        `recipient."profilePicture"`,
      ])
      .groupBy([
        `ratings."ratedRecipientId"`,
        "recipient.id",
        `recipient."firstName"`,
        `recipient."lastName"`,
        `recipient."profilePicture"`,
      ])
      .orderBy(`"averageRating"`, "DESC")
      .skip(page * quantity)
      .take(quantity)
      .getRawMany();

    return { page, quantity: ranking.length, ranking };
  }

  static async getUsersWithMoreLearnerSubscriptions({
    page = 0,
    quantity = 10,
  }) {
    const ranking = await AppDatasource.createQueryBuilder()
      .select("COUNT(*)", "learnerSubscriptionsCount")
      .from(Learners, "learners")
      .innerJoin("learners.candidate", "candidate")
      .addSelect(`candidate."id"`, "userId")
      .addSelect([
        `candidate."firstName"`,
        `candidate."lastName"`,
        `candidate."profilePicture"`,
      ])
      .groupBy([
        `learners."candidateId"`,
        "candidate.id",
        `candidate."firstName"`,
        `candidate."lastName"`,
        `candidate."profilePicture"`,
      ])
      .orderBy(`"learnerSubscriptionsCount"`, "DESC")
      .skip(page * quantity)
      .take(quantity)
      .getRawMany();

    return { page, quantity: ranking.length, ranking };
  }

  static async getUsersWithBiggestTestScores({ page = 0, quantity = 10 }) {
    const ranking = await AppDatasource.createQueryBuilder()
      .select("SUM(tests.score)", "totalTestsScore")
      .from(Tests, "tests")
      .innerJoin("tests.user", "applicant")
      .addSelect(`applicant."id"`, "userId")
      .addSelect([
        `applicant."firstName"`,
        `applicant."lastName"`,
        `applicant."profilePicture"`,
      ])
      .groupBy([
        `tests."userId"`,
        "applicant.id",
        `applicant."firstName"`,
        `applicant."lastName"`,
        `applicant."profilePicture"`,
      ])
      .orderBy(`"totalTestsScore"`, "DESC")
      .skip(page * quantity)
      .take(quantity)
      .getRawMany();

    return { page, quantity: ranking.length, ranking };
  }

  static async getUsersWithBestSkillScores({ page = 0, quantity = 10 }) {
    const ranking = await AppDatasource.createQueryBuilder()
      .select(`candidate."id"`, "userId")
      .addSelect("SUM(skills.score)", "total")
      .addSelect([
        `candidate."firstName"`,
        `candidate."lastName"`,
        `candidate."profilePicture"`,
      ])
      .distinctOn(["candidate.id"])
      .from(UserSkills, "skills")
      .innerJoin("skills.user", "candidate")
      .innerJoin("skills.technology", "technology")
      .groupBy([
        "candidate.id",
        `candidate."firstName"`,
        `candidate."lastName"`,
        `candidate."profilePicture"`,
      ])
      .orderBy("candidate.id", "ASC")
      .addOrderBy("total", "DESC")
      .skip(page * quantity)
      .take(quantity)
      .getRawMany();

    const sortedSkillsScoreRanking = ranking.sort(
      (previousUser, nextUser) => nextUser.total - previousUser.total
    );

    return { page, quantity: ranking.length, ranking: sortedSkillsScoreRanking };
  }
}

module.exports = { RankingsService };
