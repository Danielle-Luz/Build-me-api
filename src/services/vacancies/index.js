const { AppDatasource } = require("../../data-source");
const {
  Vacancies,
  VacancyRequirements,
  UserSkills,
} = require("../../entities");
const { RecordNotFoundError } = require("../../errors");
const { ProjectsService } = require("../projects");
const { UsersService } = require("../users");

class VacanciesService {
  static async create(newVacancy) {
    const createdVacancy = await AppDatasource.createQueryBuilder()
      .insert()
      .into(Vacancies)
      .values(newVacancy)
      .returning("*")
      .execute();

    return createdVacancy.generatedMaps[0];
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
      .select(["vacancies",`project."closeDate"`])
      .from(Vacancies, "vacancies")
      .leftJoinAndSelect("vacancies.project", "project")
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

  static async getVacanciesRelatedToUser(userId) {
    return AppDatasource.createQueryBuilder()
      .select("vacancies")
      .from(Vacancies, "vacancies")
      .innerJoinAndSelect("vacancies.project", "project")
      .where("vacancies.chosenCandidateId = :userId", { userId })
      .orderBy("vacancies.createdDate", "DESC")
      .getMany();
  }

  static async getProjectColleagues(projectId, chosenCandidateIds) {
    return AppDatasource.createQueryBuilder()
      .select("vacancies.chosenCandidateId")
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
        "user_skills.technologyId = vacancy_requirements.technologyId AND user_skills.score >= vacancy_requirements.skillLevelScore AND user_skills.userId = :userId",
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
        "user_skills.technologyId = vacancy_requirements.technologyId AND user_skills.score >= vacancy_requirements.skillLevelScore AND user_skills.userId = :userId",
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

  static async getVacancyProjectOwnerId(vacancyId) {
    return AppDatasource.createQueryBuilder()
      .select("project.createdById", "createdById")
      .from(Vacancies, "vacancies")
      .innerJoinAndSelect("vacancies.project", "project")
      .where("vacancies.id = :vacancyId", { vacancyId })
      .getRawOne();
  }

  static async getRelatedProjectMembersCount(projectId) {
    return AppDatasource.createQueryBuilder()
      .select("COUNT(vacancies.chosenCandidateId)", "membersCount")
      .from(Vacancies, "vacancies")
      .where("vacancies.projectId = :projectId", { projectId })
      .groupBy("vacancies.chosenCandidateId")
      .getRawOne();
  }

  static async update(id, updatedData) {
    const updatedVacancy = await AppDatasource.createQueryBuilder()
      .update(Vacancies)
      .set(updatedData)
      .where("id = :id", { id })
      .returning("*")
      .execute();

    const wasVacancyUpdated = updatedVacancy.affected != 0;

    if (!wasVacancyUpdated) {
      throw new RecordNotFoundError(
        "No vacancy with the informed id was found"
      );
    }

    return updatedVacancy.raw[0];
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

  static async giveUpFromVacancy(vacancyId, loggedUserId) {
    const updatedData = { chosenCandidateId: null };
    const updatedVacancy = await VacanciesService.update(
      vacancyId,
      updatedData
    );

    const chosenCandidate = await UsersService.getById(loggedUserId);

    const dropoutLimit = 3;
    const dropoutData = {};

    if (chosenCandidate.vacancyDropoutsNumber >= dropoutLimit) {
      const daysUntilReapply = 30;
      const nextApplicationDate = new Date();

      nextApplicationDate.setDate(
        nextApplicationDate.getDate() + daysUntilReapply
      );

      dropoutData.vacancyBlockDate = nextApplicationDate;
      dropoutData.vacancyDropoutsNumber = 0;
    } else {
      dropoutData.vacancyDropoutsNumber =
        chosenCandidate.vacancyDropoutsNumber + 1;
    }

    await UsersService.update(loggedUserId, dropoutData);

    return { dropoutData };
  }

  static async delete(id) {
    const deletedVacancy = await AppDatasource.createQueryBuilder()
      .delete()
      .from(Vacancies, "vacancies")
      .where("vacancies.id = :id", { id })
      .execute();

    const wasVacancyDeleted = deletedVacancy.affected != 0;

    if (!wasVacancyDeleted) {
      return new RecordNotFoundError(
        "No vacancy with the informed id was found"
      );
    }
  }
}

module.exports = { VacanciesService };
