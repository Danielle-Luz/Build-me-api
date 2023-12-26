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
    return AppDatasource.createQueryBuilder()
      .select("learners")
      .from(Learners, "learners")
      .where("learners.id = :id", { id })
      .getOne();
  }

  static async update(id, updatedData) {
    const updatedLearner = await AppDatasource.createQueryBuilder()
      .update(Learners)
      .set(updatedData)
      .where("id = :id", { id })
      .returning("*")
      .execute();

    const wasLearnerUpdated = updatedLearner.affected != 0;

    if (!wasLearnerUpdated) {
      throw new RecordNotFoundError(
        "No learner with the informed id was found"
      );
    }

    return updatedLearner.raw[0];
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
