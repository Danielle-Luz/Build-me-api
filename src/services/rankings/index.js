const { AppDatasource } = require("../../data-source");
const {
  Vacancies,
  Ratings,
  Learners,
  Tests,
  UserSkills,
} = require("../../entities");

class RankingsService {
  static async getUsersWithMoreVacanciesParticipations() {
    return AppDatasource.createQueryBuilder()
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
      .getRawMany();
  }

  static async getUsersWithMoreRatingsMade() {
    return AppDatasource.createQueryBuilder()
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
      .getRawMany();
  }

  static async getUsersWithBiggestAverageRatings() {
    return AppDatasource.createQueryBuilder()
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
      .getRawMany();
  }

  static async getUsersWithMoreLearnerSubscriptions() {
    return AppDatasource.createQueryBuilder()
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
      .getRawMany();
  }

  static async getUsersWithBiggestTestScores() {
    return AppDatasource.createQueryBuilder()
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
      .getRawMany();
  }

  static async getUsersWithBestSkillScores() {
    return AppDatasource.createQueryBuilder()
      .select(`candidate."id"`, "userId")
      .addSelect([
        `candidate."firstName"`,
        `candidate."lastName"`,
        `candidate."profilePicture"`,
      ])
      .addSelect(`technology."name"`, "technologyName")
      .addSelect("skills.score", "skillScore")
      .from(UserSkills, "skills")
      .innerJoin("skills.user", "candidate")
      .innerJoin("skills.technology", "technology")
      .addSelect()
      .groupBy([
        `technology."name"`,
        `skills."userId"`,
        "skills.score",
        "candidate.id",
        `candidate."firstName"`,
        `candidate."lastName"`,
        `candidate."profilePicture"`,
      ])
      .orderBy("skills.score", "DESC")
      .getRawMany();
  }
}

module.exports = { RankingsService };
