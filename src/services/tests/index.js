const { AppDatasource } = require("../../data-source");
const { Tests } = require("../../entities");
const { RecordNotFoundError } = require("../../errors");

class TestsService {
  static async create(newTest) {
    const createdTest = await AppDatasource.createQueryBuilder()
      .insert()
      .into(Tests)
      .values(newTest)
      .returning("*")
      .execute();

    return createdTest.generatedMaps[0];
  }

  static async getTestById(id) {
    const foundTest = await AppDatasource.createQueryBuilder()
      .select("tests")
      .from(Tests, "tests")
      .where("tests.id = :id", { id })
      .getOne();

    if (!foundTest) {
      throw new RecordNotFoundError("No test with the informed id was found");
    }

    return foundTest;
  }

  static async getTestsByTechnologyId(technologyId) {
    return AppDatasource.createQueryBuilder()
      .select("tests")
      .from(Tests, "tests")
      .where("tests.technologyId = :technologyId", { technologyId })
      .orderBy("tests.score", "DESC")
      .getMany();
  }

  static async getTestsByUser(userId) {
    return AppDatasource.createQueryBuilder()
      .select("tests")
      .from(Tests, "tests")
      .where("tests.userId = :userId", { userId })
      .getMany();
  }

  static async getTestsByUserAndTechnology(userId, technologyId) {
    return AppDatasource.createQueryBuilder()
      .select("tests")
      .from(Tests, "tests")
      .where("tests.userId = :userId", { userId })
      .andWhere("tests.technologyId = :technologyId", { technologyId })
      .orderBy("tests.createdDate", "DESC")
      .getMany();
  }

  static async getMostRecentUserTestByTechnologyId(userId, technologyId) {
    const foundTest = await AppDatasource.createQueryBuilder()
      .select("tests")
      .from(Tests, "tests")
      .where("tests.userId = :userId", { userId })
      .andWhere("tests.technologyId = :technologyId", { technologyId })
      .orderBy("tests.createdDate", "DESC")
      .getOne();

    if (!foundTest) {
      throw new RecordNotFoundError(
        "No test found for the user and technology"
      );
    }

    return foundTest;
  }

  static async update(id, updatedData) {
    const updatedTest = await AppDatasource.createQueryBuilder()
      .update(Tests)
      .set(updatedData)
      .where("id = :id", { id })
      .returning("*")
      .execute();

    const wasTestUpdated = updatedTest.affected !== 0;

    if (!wasTestUpdated) {
      throw new RecordNotFoundError("No test with the informed id was found");
    }

    return updatedTest.raw[0];
  }

  static async delete(id) {
    const deletedTest = await AppDatasource.createQueryBuilder()
      .delete()
      .from(Tests, "tests")
      .where("tests.id = :id", { id })
      .execute();

    const wasTestDeleted = deletedTest.affected !== 0;

    if (!wasTestDeleted) {
      throw new RecordNotFoundError("No test with the informed id was found");
    }
  }
}

module.exports = { TestsService };
