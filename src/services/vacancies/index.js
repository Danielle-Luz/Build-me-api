const { AppDatasource } = require("../../data-source");
const {
  Vacancies,
  VacancyRequirements,
  UserSkills,
} = require("../../entities");
const { RecordNotFoundError } = require("../../errors");
const { ProjectsService } = require("../projects");

class VacanciesService {
  static async create(newVacancie) {
    const createdVacancie = await AppDatasource.createQueryBuilder()
      .insert()
      .into(Vacancies)
      .values(newVacancie)
      .returning("*")
      .execute();

    return createdVacancie.generatedMaps[0];
  }

  static async getAll() {
    return AppDatasource.createQueryBuilder()
      .select("vacancies")
      .from(Vacancies, "vacancies")
      .innerJoinAndSelect("vacancies.project", "project")
      .orderBy("vacancies.createdDate", "DESC")
      .getMany();
  }

  static async getProjectVacancies(projectId) {
    return AppDatasource.createQueryBuilder()
      .select("vacancies")
      .from(Vacancies, "vacancies")
      .where("vacancies.projectId = :projectId", { projectId })
      .leftJoinAndSelect("vacancies.chosenCandidate", "candidate")
      .orderBy("vacancies.name")
      .getMany();
  }

  static async getProjectVacanciesWithoutCandidate(projectId) {
    return AppDatasource.createQueryBuilder()
      .select("vacancies")
      .from(Vacancies, "vacancies")
      .where("vacancies.projectId = :projectId", { projectId })
      .andWhere("vacancies.chosenCandidateId is null")
      .orderBy("vacancies.name")
      .getMany();
  }

  static async getOpenProjectsUnrelatedVacancies() {
    return AppDatasource.createQueryBuilder()
      .select("vacancies")
      .from(Vacancies, "vacancies")
      .innerJoinAndSelect("vacancies.project", "project")
      .leftJoinAndSelect("vacancies.chosenCandidate", "candidate")
      .where("project.closeDate >= CURRENT_DATE")
      .andWhere("vacancies.chosenCandidateId is null")
      .orderBy("vacancies.createdDate", "DESC")
      .getMany();
  }

  static async getVacancyById(id) {
    const foundVacancy = await AppDatasource.createQueryBuilder()
      .select("vacancies")
      .from(Vacancies, "vacancies")
      .leftJoinAndSelect("vacancies.project", "project")
      .leftJoinAndSelect("vacancies.chosenCandidate", "chosenCandidate")
      .where("vacancies.id = :id", { id })
      .getOne();

    if (!foundVacancy) {
      throw new RecordNotFoundError(
        "No vacancy with the informed id was found"
      );
    }

    return foundVacancy;
  }

  static async getVacantionsRelatedToUser(userId) {
    return AppDatasource.createQueryBuilder()
      .select("vacancies")
      .from(Vacancies, "vacancies")
      .where("vacancies.chosenCandidateId = :userId", { userId })
      .orderBy("vacancies.createdDate", "DESC")
      .getMany();
  }

  static async getProjectColleagues(projectId, chosenCandidateIds) {
    return AppDatasource.createQueryBuilder()
      .select(["vacancies.chosenCandidateId"])
      .from(Vacancies, "vacancies")
      .where("vacancies.chosenCandidateId IN (:...chosenCandidateIds)", {
        chosenCandidateIds,
      })
      .andWhere("vacancies.projectId = :projectId", { projectId })
      .groupBy("vacancies.chosenCandidateId")
      .getRawMany();
  }

  static async getVacanciesMatchingUserSkillsForProject(projectId, userId) {
    return AppDatasource.createQueryBuilder()
      .select()
      .from(VacancyRequirements, "vacancy_requirements")
      .leftJoin(
        UserSkills,
        "user_skills",
        "user_skills.technologyId = vacancy_requirements.technologyId AND user_skills.skillLevel = vacancy_requirements.skillLevel AND user_skills.userId = :userId",
        {
          userId,
        }
      )
      .innerJoin(
        Vacancies,
        "vacancy",
        "vacancy_requirements.vacancyId = vacancy.id"
      )
      .addSelect([
        "vacancy.id AS id",
        "vacancy.name AS name",
        "vacancy.description AS description",
        "vacancy.createdDate AS createdDate",
        "vacancy.learnersLimit AS learnersLimit",
        "vacancy.projectId AS projectId",
        "vacancy.chosenCandidateId AS chosenCandidateId",
      ])
      .innerJoin("vacancy.project", "project")
      .where("vacancy.projectId = :projectId", { projectId })
      .andWhere("project.closeDate >= CURRENT_DATE")
      .andHaving("COUNT(CASE WHEN user_skills.userId IS NULL THEN 1 END) = 0")
      .groupBy("vacancy.id")
      .getRawMany();
  }

  static async getAllVacanciesMatchingUserSkills(userId) {
    return AppDatasource.createQueryBuilder()
      .select()
      .from(VacancyRequirements, "vacancy_requirements")
      .leftJoin(
        UserSkills,
        "user_skills",
        "user_skills.technologyId = vacancy_requirements.technologyId AND user_skills.skillLevel = vacancy_requirements.skillLevel AND user_skills.userId = :userId",
        {
          userId,
        }
      )
      .innerJoin(
        Vacancies,
        "vacancy",
        "vacancy_requirements.vacancyId = vacancy.id"
      )
      .addSelect([
        "vacancy.id AS id",
        "vacancy.name AS name",
        "vacancy.description AS description",
        "vacancy.createdDate AS createdDate",
        "vacancy.learnersLimit AS learnersLimit",
        "vacancy.projectId AS projectId",
        "vacancy.chosenCandidateId AS chosenCandidateId",
      ])
      .innerJoin("vacancy.project", "project")
      .where("project.closeDate >= CURRENT_DATE")
      .andHaving("COUNT(CASE WHEN user_skills.userId IS NULL THEN 1 END) = 0")
      .groupBy("vacancy.id")
      .orderBy("vacancy.createdDate")
      .getRawMany();
  }

  static async getVacanciesFromOpenProjectsRelatedToUser(userId) {
    return AppDatasource.createQueryBuilder()
      .select("COUNT(vacancies.id)", "quantity")
      .from(Vacancies, "vacancies")
      .innerJoin("vacancies.project", "project")
      .where("vacancies.chosenCandidateId = :userId", { userId })
      .andWhere("project.closeDate >= CURRENT_DATE")
      .getRawOne();
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
      throw new RecordNotFoundError(
        "No vacancie with the informed id was found"
      );
    }

    return updatedVacancie.raw[0];
  }

  static async setUserAsChosenIfArrivalMethodOnProject(userId, vacancyId) {
    const subscriptedVacancy = await VacanciesService.getVacancyById(vacancyId);
    const vacancyRelatedProject = await ProjectsService.getById(
      subscriptedVacancy.projectId
    );
    const hasArrivalSelectionMethod =
      vacancyRelatedProject.memberSelectionMethod == "Ordem de inscrição";

    if (hasArrivalSelectionMethod) {
      const vacancyWithChosenCandidate = { chosenCandidateId: userId };
      VacanciesService.update(vacancyId, vacancyWithChosenCandidate);
    }
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
