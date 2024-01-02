const { AppDatasource } = require("../../data-source");
const { Tests } = require("../../entities");
const { RecordNotFoundError } = require("../../errors");
const { TestsHelper } = require("../../helpers");
const { QuestionsService } = require("../questions");
const { UserSkillsService } = require("../userSkills");

class TestsService {
  static async checkTestAnswers(testAnswers, testTakerId) {
    const questionsIds = testAnswers.map(({ questionId }) => questionId);
    const questionsWithRightAnswers =
      await QuestionsService.getQuestionsWithRightsAnswers(questionsIds);

    const initialScore = 0;
    const rightAnswersScore = questionsWithRightAnswers.reduce(
      TestsHelper.calculateTestScore(testAnswers),
      initialScore
    );

    const testTechnology = questionsWithRightAnswers[0].technologyId;

    const { createdTest, isBiggestScore } =
      await TestsService.createTestAndUserSkill({
        testTakerId,
        testTechnology,
        rightAnswersScore,
      });

    return { createdTest, isBiggestScore };
  }

  static async createTestAndUserSkill(testData) {
    const newTest = {
      userId: testData.testTakerId,
      technologyId: testData.testTechnology,
      score: testData.rightAnswersScore,
    };

    const skillLevelFromTestScore = TestsHelper.getSkillLevelFromTestScore(
      testData.rightAnswersScore
    );

    const newUserSkill = {
      userId: testData.testTakerId,
      technologyId: testData.testTechnology,
      skillLevel: skillLevelFromTestScore,
      score: testData.rightAnswersScore,
    };

    const biggestScore = await TestsService.getLatestBiggestScore(
      testData.testTakerId,
      testData.testTechnology
    );

    const isNewTestScoreGreaterThanPrevious =
      testData.rightAnswersScore > biggestScore;

    if (isNewTestScoreGreaterThanPrevious) {
      await UserSkillsService.upsert(newUserSkill, biggestScore);
    }

    const createdTest = await TestsService.create(newTest);

    return {
      createdTest,
      isBiggestScore: isNewTestScoreGreaterThanPrevious,
    };
  }

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

  static async getLatestBiggestScore(userId, technologyId) {
    const foundTest = await AppDatasource.createQueryBuilder()
      .select("tests.score")
      .from(Tests, "tests")
      .where("tests.userId = :userId", { userId })
      .andWhere("tests.technologyId = :technologyId", { technologyId })
      .orderBy("tests.score", "DESC")
      .getOne();

    return foundTest?.score || 0;
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
