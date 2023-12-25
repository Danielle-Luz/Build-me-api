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

  static async getRatingsMade(authorId) {
    return AppDatasource.createQueryBuilder()
      .select("ratings")
      .from(Ratings, "ratings")
      .where("ratings.authorId = :authorId", { authorId })
      .getMany();
  }

  static async getRatingsReceived(ratedRecipientId) {
    return AppDatasource.createQueryBuilder()
      .select("ratings")
      .from(Ratings, "ratings")
      .where("ratings.ratedRecipientId = :ratedRecipientId", {
        ratedRecipientId,
      })
      .getMany();
  }

  static async getRatingsAverage(ratedRecipientId) {
    return AppDatasource.createQueryBuilder()
      .select("ROUND(AVG(ratings.grade), 2)", "averageRating")
      .from(Ratings, "ratings")
      .where("ratings.ratedRecipientId = :ratedRecipientId", {
        ratedRecipientId,
      })
      .getRawOne();
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
