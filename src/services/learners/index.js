const { AppDatasource } = require("../../data-source");
const { Learners } = require("../../entities");
const { RecordNotFoundError } = require("../../errors");

class LearnersService {
  static async create(newLearner) {
    const createdLearner = await AppDatasource.createQueryBuilder()
      .insert()
      .into(Learners)
      .values(newLearner)
      .returning("*")
      .execute();

    return createdLearner.generatedMaps[0];
  }

  static async getAll() {
    return AppDatasource.createQueryBuilder()
      .select("learners")
      .from(Learners, "learners")
      .orderBy("learners.createdDate", "DESC")
      .getMany();
  }

  static async getById(id) {
    const foundLearner = await AppDatasource.createQueryBuilder()
      .select("learners")
      .from(Learners, "learners")
      .where("learners.id = :id", { id })
      .getOne();

    if (!foundLearner) {
      throw new RecordNotFoundError(
        "No learner with the informed id was found"
      );
    }

    return foundLearner;
  }

  static async getLearnersCountByVacancyId(vacancyId) {
    return AppDatasource.createQueryBuilder()
      .select("COUNT(learners.id)", "learnersCount")
      .from(Learners, "learners")
      .where("learners.vacancyId = :vacancyId", { vacancyId })
      .getRawOne();
  }

  static async getLearnersByVacancyId(vacancyId) {
    return AppDatasource.createQueryBuilder()
      .select("learners")
      .from(Learners, "learners")
      .where("learners.vacancyId = :vacancyId", { vacancyId })
      .innerJoinAndSelect("learners.candidate", "candidate")
      .orderBy("learners.createdDate", "DESC")
      .getMany();
  }

  static async getVacancyLearnerByCandidateId(vacancyId, candidateId) {
    return AppDatasource.createQueryBuilder()
      .select("learners")
      .from(Learners, "learners")
      .where("learners.vacancyId = :vacancyId", { vacancyId })
      .andWhere("learners.candidateId = :candidateId", { candidateId })
      .getOne();
  }

  static async getLearnersByCandidateId(candidateId) {
    return AppDatasource.createQueryBuilder()
      .select("learners")
      .from(Learners, "learners")
      .where("learners.candidateId = :candidateId", { candidateId })
      .leftJoinAndSelect("learners.vacancy", "vacancy")
      .leftJoinAndSelect("vacancy.project", "project")
      .orderBy("learners.createdDate", "DESC")
      .getMany();
  }

  static async getLearnerCountByCandidateId(candidateId) {
    return AppDatasource.createQueryBuilder()
      .select("COUNT(learners.id)", "quantity")
      .from(Learners, "learners")
      .leftJoin("learners.vacancy", "vacancy")
      .leftJoin("vacancy.project", "project")
      .where("learners.candidateId = :candidateId", { candidateId })
      .andWhere("project.closeDate >= CURRENT_DATE")
      .getRawOne();
  }

  static async delete(id) {
    const deletedLearner = await AppDatasource.createQueryBuilder()
      .delete()
      .from(Learners, "learners")
      .where("learners.id = :id", { id })
      .execute();

    const wasLearnerDeleted = deletedLearner.affected != 0;

    if (!wasLearnerDeleted) {
      throw new RecordNotFoundError(
        "No learner with the informed id was found"
      );
    }
  }
}

module.exports = { LearnersService };
