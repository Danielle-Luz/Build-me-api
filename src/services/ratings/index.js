const { AppDatasource } = require("../../data-source");
const { Ratings } = require("../../entities");
const { RecordNotFoundError } = require("../../errors");

class RatingsServices {
  static async create(newRating) {
    const createdRating = await AppDatasource.createQueryBuilder()
      .insert()
      .into(Ratings)
      .values(newRating)
      .returning("*")
      .execute();

    return createdRating.generatedMaps[0];
  }

  static async getRatingsById(id) {
    return AppDatasource.createQueryBuilder()
      .select("ratings")
      .from(Ratings, "ratings")
      .where("ratings.id = :id", { id })
      .getOne();
  }

  static async getRatingsMade(authorId, { page = 0, quantity = 10 }) {
    const ratings = await AppDatasource.createQueryBuilder()
      .select("ratings")
      .from(Ratings, "ratings")
      .leftJoinAndSelect("ratings.author", "author")
      .leftJoinAndSelect("ratings.ratedRecipient", "ratedRecipient")
      .where("ratings.authorId = :authorId", { authorId })
      .skip(page * quantity)
      .take(quantity)
      .getMany();

    return { page, quantity: ratings.length, ratings };
  }

  static async getRatingsReceived(
    ratedRecipientId,
    { page = 0, quantity = 10 }
  ) {
    const ratings = await AppDatasource.createQueryBuilder()
      .select("ratings")
      .from(Ratings, "ratings")
      .where("ratings.ratedRecipientId = :ratedRecipientId", {
        ratedRecipientId,
      })
      .leftJoinAndSelect("ratings.author", "author")
      .leftJoinAndSelect("ratings.ratedRecipient", "ratedRecipient")
      .skip(page * quantity)
      .take(quantity)
      .getMany();

    return { page, quantity: ratings.length, ratings };
  }

  static async getRatingsAverage(ratedRecipientId) {
    const foundRating = await AppDatasource.createQueryBuilder()
      .select("ROUND(AVG(ratings.grade), 2)", "averageRating")
      .from(Ratings, "ratings")
      .where("ratings.ratedRecipientId = :ratedRecipientId", {
        ratedRecipientId,
      })
      .getRawOne();

    const hasNoRatings = foundRating.averageRating == null;

    foundRating.averageRating = hasNoRatings
      ? 0
      : Number(foundRating.averageRating);

    return foundRating;
  }

  static async getAuthorLastRatingForUser(
    authorId,
    ratedRecipientId,
    projectId
  ) {
    return AppDatasource.createQueryBuilder()
      .select("ratings")
      .from(Ratings, "ratings")
      .leftJoinAndSelect("ratings.author", "author")
      .leftJoinAndSelect("ratings.ratedRecipient", "ratedRecipient")
      .where("ratings.ratedRecipientId = :ratedRecipientId", {
        ratedRecipientId,
      })
      .andWhere("ratings.authorId = :authorId", { authorId })
      .andWhere("ratings.projectId = :projectId", { projectId })
      .orderBy("ratings.createdDate", "DESC")
      .getOne();
  }

  static async update(id, updatedData) {
    const updatedRating = await AppDatasource.createQueryBuilder()
      .update(Ratings)
      .set(updatedData)
      .where("id = :id", { id })
      .returning("*")
      .execute();

    return updatedRating.raw[0];
  }

  static async delete(id) {
    const deletedRating = await AppDatasource.createQueryBuilder()
      .delete()
      .from(Ratings, "ratings")
      .where("ratings.id = :id", { id })
      .execute();

    const wasRatingDeleted = deletedRating.affected != 0;

    if (!wasRatingDeleted) {
      throw new RecordNotFoundError("No rating with the informed id was found");
    }
  }
}

module.exports = { RatingsServices };
