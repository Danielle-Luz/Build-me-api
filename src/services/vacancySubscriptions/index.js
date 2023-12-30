const { AppDatasource } = require("../../data-source");
const { VacancySubscriptions } = require("../../entities");
const { RecordNotFoundError } = require("../../errors");
const { VacanciesService } = require("../vacancies");

class VacancySubscriptionsService {
  static async create(newVacancySubscription) {
    const createdVacancySubscription = await AppDatasource.createQueryBuilder()
      .insert()
      .into(VacancySubscriptions)
      .values(newVacancySubscription)
      .returning("*")
      .execute();

    VacanciesService.setUserAsChosenIfArrivalMethodOnProject(
      newVacancySubscription.userId,
      newVacancySubscription.vacancyId
    );

    return createdVacancySubscription.generatedMaps[0];
  }

  static async getByVacancyId(vacancyId) {
    return AppDatasource.createQueryBuilder()
      .select("vacancy_subscriptions")
      .from(VacancySubscriptions, "vacancy_subscriptions")
      .innerJoinAndSelect("vacancy_subscriptions.user", "user")
      .where("vacancy_subscriptions.vacancyId = :vacancyId", { vacancyId })
      .orderBy("vacancy_subscriptions.createdDate")
      .getMany();
  }

  static async getByUserId(userId) {
    return AppDatasource.createQueryBuilder()
      .select("vacancy_subscriptions")
      .from(VacancySubscriptions, "vacancy_subscriptions")
      .innerJoinAndSelect("vacancy_subscriptions.vacancy", "vacancy")
      .where("vacancy_subscriptions.userId = :userId", { userId })
      .orderBy("vacancy_subscriptions.createdDate")
      .getMany();
  }

  static async getById(vacancySubscriptionId) {
    const foundVacancySubscription = await AppDatasource.createQueryBuilder()
      .select("vacancy_subscriptions")
      .from(VacancySubscriptions, "vacancy_subscriptions")
      .innerJoinAndSelect("vacancy_subscriptions.vacancy", "vacancy")
      .innerJoinAndSelect("vacancy_subscriptions.user", "user")
      .where("vacancy_subscriptions.id = :vacancySubscriptionId", {
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

  static async getUserVacancySubscription(vacancyId, userId) {
    return AppDatasource.createQueryBuilder()
      .select("vacancy_subscriptions")
      .from(VacancySubscriptions, "vacancy_subscriptions")
      .where("vacancy_subscriptions.vacancyId = :vacancyId", { vacancyId })
      .andWhere("vacancy_subscriptions.userId = :userId", { userId })
      .getOne();
  }

  static async delete(vacancySubscriptionId) {
    const deletedSubscription = await AppDatasource.createQueryBuilder()
      .delete()
      .from(VacancySubscriptions, "vacancy_subscriptions")
      .where("vacancy_subscriptions.id = :vacancySubscriptionId", {
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
