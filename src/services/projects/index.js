const { AppDatasource } = require("../../data-source");
const { Projects } = require("../../entities");
const { ProjectsHelper } = require("../../helpers");
const { RecordNotFoundError } = require("../../errors");

class ProjectsService {
  static async create(newProject) {
    const createdProject = await AppDatasource.createQueryBuilder()
      .insert()
      .into(Projects)
      .values(newProject)
      .returning("*")
      .execute();

    const createdProjectData = createdProject.generatedMaps[0];

    const hasRandomSelectionMethod =
      newProject.memberSelectionMethod == "Aleatória";

    if (hasRandomSelectionMethod) {
      ProjectsHelper.scheduleCandidatesSelectionOnCloseDate(
        createdProjectData.id,
        createdProjectData.closeDate
      );
    }

    return createdProjectData;
  }

  static async getAll() {
    return AppDatasource.createQueryBuilder()
      .select("projects")
      .from(Projects, "projects")
      .orderBy("projects.createdDate", "DESC")
      .getMany();
  }

  static async getById(id) {
    const foundProject = await AppDatasource.createQueryBuilder()
      .select("projects")
      .from(Projects, "projects")
      .where("projects.id = :id", { id })
      .getOne();

    if (!foundProject) {
      throw new RecordNotFoundError(
        "No project with the informed id was found"
      );
    }

    return foundProject;
  }

  static async getUserProjects(createdById) {
    return AppDatasource.createQueryBuilder()
      .select("projects")
      .from(Projects, "projects")
      .where("projects.createdById = :createdById", { createdById })
      .orderBy("projects.createdDate", "DESC")
      .getMany();
  }

  static async getProjectsByFilter(value) {
    const formattedValue = `%${value}%`;
    return AppDatasource.createQueryBuilder()
      .select("projects")
      .from(Projects, "projects")
      .where("projects.name ilike :formattedValue", { formattedValue })
      .orWhere("projects.description ilike :formattedValue", {
        formattedValue,
      })
      .orderBy("projects.createdDate", "DESC")
      .getMany();
  }

  static async getOpenProjects() {
    const actualDate = new Date();
    return AppDatasource.createQueryBuilder()
      .select("projects")
      .from(Projects, "projects")
      .where("projects.closeDate >= :actualDate", { actualDate })
      .orderBy("projects.createdDate", "DESC")
      .getMany();
  }

  static async getProjectsByMemberSelectionMethod(memberSelectionMethod) {
    return AppDatasource.createQueryBuilder()
      .select("projects")
      .from(Projects, "projects")
      .where("projects.memberSelectionMethod = :memberSelectionMethod", {
        memberSelectionMethod,
      })
      .orderBy("projects.createdDate", "DESC")
      .getMany();
  }

  static async update(id, updatedData) {
    const updatedProject = await AppDatasource.createQueryBuilder()
      .update(Projects)
      .set(updatedData)
      .where("id = :id", { id })
      .returning("*")
      .execute();

    const wasProjectUpdated = updatedProject.affected != 0;

    if (!wasProjectUpdated) {
      throw new RecordNotFoundError(
        "No project with the informed id was found"
      );
    }

    return updatedProject.raw[0];
  }

  static async delete(id) {
    const deletedProject = await AppDatasource.getRepository(Projects)
      .createQueryBuilder()
      .softDelete()
      .where("projects.id = :id", { id })
      .execute();

    const wasProjectDeleted = deletedProject.affected != 0;

    if (!wasProjectDeleted) {
      throw new RecordNotFoundError(
        "No project with the informed id was found"
      );
    }
  }
}

module.exports = { ProjectsService };
