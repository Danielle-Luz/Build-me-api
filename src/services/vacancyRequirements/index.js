const { AppDatasource } = require("../../data-source");
const {
  VacancyRequirements,
  UserSkills,
  Vacancies,
} = require("../../entities");
const { RecordNotFoundError } = require("../../errors");

class VacancyRequirementsService {
  static async create(newVacancyRequirement) {
    const createdVacancyRequirement = await AppDatasource.createQueryBuilder()
      .insert()
      .into(VacancyRequirements)
      .values(newVacancyRequirement)
      .returning("*")
      .execute();

    return createdVacancyRequirement.generatedMaps[0];
  }

  static async getVacancyRequirementsByVacancyId(vacancyId) {
    return AppDatasource.createQueryBuilder()
      .select("vacancy_requirements")
      .from(VacancyRequirements, "vacancy_requirements")
      .where("vacancy_requirements.vacancyId = :vacancyId", { vacancyId })
      .getMany();
  }

  static async getVacancyRequirementById(id) {
    const foundVacancyRequirement = await AppDatasource.createQueryBuilder()
      .select("vacancy_requirements")
      .from(VacancyRequirements, "vacancy_requirements")
      .where("vacancy_requirements.id = :id", { id })
      .getOne();

    if (!foundVacancyRequirement) {
      throw new RecordNotFoundError(
        "No vacancy requirement with the informed id was found"
      );
    }

    return foundVacancyRequirement;
  }

  static async getRequirementsFulfillmentStatus(vacancyId, userId) {
    return AppDatasource.createQueryBuilder()
      .select(
        "COUNT(CASE WHEN user_skills.userId IS NULL THEN 1 END)",
        "unmetRequirementsCount"
      )
      .addSelect(
        "COUNT(CASE WHEN user_skills.userId IS NOT NULL THEN 1 END)",
        "metRequirementsCount"
      )
      .from(VacancyRequirements, "vacancy_requirements")
      .leftJoin(
        UserSkills,
        "user_skills",
        "user_skills.technologyId = vacancy_requirements.technologyId AND user_skills.score >= vacancy_requirements.skillLevelScore AND user_skills.userId = :userId",
        { userId }
      )
      .where("vacancy_requirements.vacancyId = :vacancyId", { vacancyId })
      .groupBy("vacancy_requirements.vacancyId")
      .getRawOne();
  }

  static async update(id, updatedData) {
    const updatedVacancyRequirement = await AppDatasource.createQueryBuilder()
      .update(VacancyRequirements)
      .set(updatedData)
      .where("id = :id", { id })
      .returning("*")
      .execute();

    const wasVacancyRequirementUpdated =
      updatedVacancyRequirement.affected != 0;

    if (!wasVacancyRequirementUpdated) {
      throw new RecordNotFoundError(
        "No vacancy requirement with the informed id was found"
      );
    }

    return updatedVacancyRequirement.raw[0];
  }

  static async delete(id) {
    const deletedVacancyRequirement = await AppDatasource.createQueryBuilder()
      .delete()
      .from(VacancyRequirements, "vacancy_requirements")
      .where("vacancy_requirements.id = :id", { id })
      .execute();

    const wasVacancyRequirementDeleted =
      deletedVacancyRequirement.affected != 0;

    if (!wasVacancyRequirementDeleted) {
      throw new RecordNotFoundError(
        "No vacancy requirement with the informed id was found"
      );
    }
  }
}

module.exports = { VacancyRequirementsService };
