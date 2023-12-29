const { AppDatasource } = require("../../data-source");
const { VacancySubscriptions } = require("../../entities");
const { RecordNotFoundError } = require("../../errors");

class VacancySubscriptionsService {
  static async create(newVacancySubscription) {
    const createdVacancySubscription = await AppDatasource.createQueryBuilder()
      .insert()
      .into(VacancySubscriptions)
      .values(newVacancySubscription)
      .returning("*")
      .execute();

    return createdVacancySubscription.generatedMaps[0];
  }

  static async getByVacancyId(vacancyId) {
    return AppDatasource.createQueryBuilder()
      .select("subscriptions")
      .from(VacancySubscriptions, "subscriptions")
      .innerJoinAndSelect("subscriptions.user", "user")
      .where("subscriptions.vacancyId = :vacancyId", { vacancyId })
      .orderBy("subscriptions.createdDate")
      .getMany();
  }

  static async getByUserId(userId) {
    return AppDatasource.createQueryBuilder()
      .select("subscriptions")
      .from(VacancySubscriptions, "subscriptions")
      .innerJoinAndSelect("subscriptions.vacancy", "vacancy")
      .where("subscriptions.userId = :userId", { userId })
      .orderBy("subscriptions.createdDate")
      .getMany();
  }

  static async getById(vacancySubscriptionId) {
    const foundVacancySubscription = await AppDatasource.createQueryBuilder()
      .select("subscriptions")
      .from(VacancySubscriptions, "subscriptions")
      .innerJoinAndSelect("subscriptions.vacancy", "vacancy")
      .where("subscriptions.id = :vacancySubscriptionId", {
        vacancySubscriptionId,
      })
      .getOne();

    if (!foundVacancySubscription) {
      throw new RecordNotFoundError(
        "No vacancy subscription with the informed id was found"
      );
    }

    return foundVacancySubscription;
  }

  static async delete(vacancySubscriptionId) {
    const deletedSubscription = await AppDatasource.createQueryBuilder()
      .delete()
      .from(VacancySubscriptions, "subscriptions")
      .where("subscriptions.id = :vacancySubscriptionId", {
        vacancySubscriptionId,
      })
      .execute();

    if (deletedSubscription.affected === 0) {
      throw new RecordNotFoundError(
        "No vacancy subscription with the informed id was found"
      );
    }
  }
}

module.exports = { VacancySubscriptionsService };
