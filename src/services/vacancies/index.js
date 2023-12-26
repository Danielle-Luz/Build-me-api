const { AppDatasource } = require("../../data-source");
const { Vacancies } = require("../../entities");
const { RecordNotFoundError } = require("../../errors");

class VacanciesService {
  static async create(newVacancie) {
    const createtVacancie = await AppDatasource.createQueryBuilder()
      .insert()
      .into(Vacancies)
      .values(newVacancie)
      .returning("*")
      .execute();

    return createtVacancie.generatedMaps[0];
  }

  static async getProjectVacancies(projectId) {
    return AppDatasource.createQueryBuilder()
      .select("vacancies")
      .from(Vacancies, "vacancies")
      .where("vacancies.projectId = :projectId", { projectId })
      .orderBy("vacancies.name")
      .getMany();
  }

  static async update(id, updatedData) {
    const updatedVacancie = await AppDatasource.createQueryBuilder()
      .update(Vacancies)
      .set(updatedData)
      .where("id = :id", { id })
      .returning("*")
      .execute();

    const wasVacancieUpdated = updatedVacancie.affected != 0;

    if (!wasVacancieUpdated) {
      return new RecordNotFoundError(
        "No vacancie with the informed id was found"
      );
    }

    return updatedVacancie.raw[0];
  }

  static async delete(id) {
    const deletedVacancie = await AppDatasource.createQueryBuilder()
      .delete()
      .from(Vacancies, "vacancies")
      .where("vacancies.id = :id", { id })
      .execute();

    const wasVacancieDeleted = deletedVacancie.affected != 0;

    if (!wasVacancieDeleted) {
      return new RecordNotFoundError(
        "No vacancie with the informed id was found"
      );
    }
  }
}

module.exports = { VacanciesService };
