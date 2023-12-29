const { AppDatasource } = require("../../data-source");
const { VacancyRequirements } = require("../../entities");
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
