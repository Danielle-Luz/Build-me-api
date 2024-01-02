const { AppDatasource } = require("../../data-source");
const { Questions } = require("../../entities");
const { RecordNotFoundError } = require("../../errors");

class QuestionsService {
  static async create(newQuestion) {
    const createdQuestion = await AppDatasource.createQueryBuilder()
      .insert()
      .into(Questions)
      .values(newQuestion)
      .returning("*")
      .execute();

    return createdQuestion.generatedMaps[0];
  }

  static async getAllQuestions() {
    return AppDatasource.createQueryBuilder()
      .select("questions")
      .from(Questions, "questions")
      .orderBy("questions.difficultyLevel", "ASC")
      .getMany();
  }

  static async getQuestionById(id) {
    const foundQuestion = await AppDatasource.createQueryBuilder()
      .select("questions")
      .from(Questions, "questions")
      .innerJoinAndSelect("questions.technology", "technology")
      .where("questions.id = :id", { id })
      .getOne();

    if (!foundQuestion) {
      throw new RecordNotFoundError(
        "No question with the informed id was found"
      );
    }

    return foundQuestion;
  }

  static async getQuestionsByTechnologyId(technologyId) {
    return AppDatasource.createQueryBuilder()
      .select("questions")
      .from(Questions, "questions")
      .where("questions.technologyId = :technologyId", { technologyId })
      .orderBy("questions.difficultyLevel", "ASC")
      .getMany();
  }

  static async getRandomQuestionsByTechnologyId(technologyId) {
    return AppDatasource.createQueryBuilder()
      .select("questions")
      .from(Questions, "questions")
      .where("questions.technologyId = :technologyId", { technologyId })
      .orderBy("RANDOM()")
      .limit(10)
      .getMany();
  }

  static async getQuestionsWithRightsAnswers(questionsIds) {
    return AppDatasource.createQueryBuilder()
      .select("questions")
      .from(Questions, "questions")
      .innerJoinAndSelect(
        "questions.answers",
        "answers",
        "answers.isRight = true"
      )
      .addSelect("answers.isRight")
      .where("questions.id IN(:...questionsIds)", { questionsIds })
      .getMany();
  }

  static async update(id, updatedData) {
    const updatedQuestion = await AppDatasource.createQueryBuilder()
      .update(Questions)
      .set(updatedData)
      .where("id = :id", { id })
      .returning("*")
      .execute();

    const wasQuestionUpdated = updatedQuestion.affected != 0;

    if (!wasQuestionUpdated) {
      throw new RecordNotFoundError(
        "No question with the informed id was found"
      );
    }

    return updatedQuestion.raw[0];
  }

  static async delete(id) {
    const deletedQuestion = await AppDatasource.createQueryBuilder()
      .delete()
      .from(Questions, "questions")
      .where("questions.id = :id", { id })
      .execute();

    const wasQuestionDeleted = deletedQuestion.affected != 0;

    if (!wasQuestionDeleted) {
      throw new RecordNotFoundError(
        "No question with the informed id was found"
      );
    }
  }
}

module.exports = { QuestionsService };
