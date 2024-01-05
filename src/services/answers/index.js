const { AppDatasource } = require("../../data-source");
const { Answers } = require("../../entities");
const { RecordNotFoundError } = require("../../errors");

class AnswersService {
  static async create(newAnswer) {
    const createdAnswer = await AppDatasource.createQueryBuilder()
      .insert()
      .into(Answers)
      .values(newAnswer)
      .returning("*")
      .execute();

    return createdAnswer.generatedMaps;
  }

  static async getAnswersByQuestionId(questionId) {
    return AppDatasource.createQueryBuilder()
      .select("answers")
      .from(Answers, "answers")
      .where("answers.questionId = :questionId", { questionId })
      .getMany();
  }

  static async getAnswerById(id) {
    const foundAnswer = await AppDatasource.createQueryBuilder()
      .select("answers")
      .from(Answers, "answers")
      .where("answers.id = :id", { id })
      .getOne();

    if (!foundAnswer) {
      throw new RecordNotFoundError("No answer with the informed id was found");
    }

    return foundAnswer;
  }

  static async getRightAnswerByQuestionId(questionId) {
    const rightAnswer = await AppDatasource.createQueryBuilder()
      .select("answers")
      .from(Answers, "answers")
      .where("answers.questionId = :questionId", { questionId })
      .andWhere("answers.isRight = true")
      .getOne();

    return rightAnswer;
  }

  static async update(id, updatedData) {
    const updatedAnswer = await AppDatasource.createQueryBuilder()
      .update(Answers)
      .set(updatedData)
      .where("id = :id", { id })
      .returning("*")
      .execute();

    const wasAnswerUpdated = updatedAnswer.affected != 0;

    if (!wasAnswerUpdated) {
      throw new RecordNotFoundError("No answer with the informed id was found");
    }

    return updatedAnswer.raw[0];
  }

  static async delete(id) {
    const deletedAnswer = await AppDatasource.createQueryBuilder()
      .delete()
      .from(Answers, "answers")
      .where("answers.id = :id", { id })
      .execute();

    const wasAnswerDeleted = deletedAnswer.affected != 0;

    if (!wasAnswerDeleted) {
      throw new RecordNotFoundError("No answer with the informed id was found");
    }
  }
}

module.exports = { AnswersService };
