const { AppDatasource } = require("../../data-source");
const { Projects } = require("../../entities");
const { ProjectsHelper } = require("../../helpers");
const { RecordNotFoundError } = require("../../errors");
const { projectStatus } = require("../../enumValues");

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

  static async getAll({ page = 0, quantity = 10 }) {
    const projects = await AppDatasource.createQueryBuilder()
      .select("projects")
      .from(Projects, "projects")
      .orderBy("projects.createdDate", "DESC")
      .skip(page * quantity)
      .take(quantity)
      .getMany();

    return { page, quantity: projects.length, projects };
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

  static async getUserProjects(createdById, { page = 0, quantity = 10 }) {
    const projects = await AppDatasource.createQueryBuilder()
      .select("projects")
      .from(Projects, "projects")
      .where("projects.createdById = :createdById", { createdById })
      .orderBy("projects.createdDate", "DESC")
      .skip(page * quantity)
      .take(quantity)
      .getMany();

    return { page, quantity: projects.length, projects };
  }

  static async getProjectsByFilter(value, { page = 0, quantity = 10 }) {
    const formattedValue = `%${value}%`;
    const projects = await AppDatasource.createQueryBuilder()
      .select("projects")
      .from(Projects, "projects")
      .where("projects.name ilike :formattedValue", { formattedValue })
      .orWhere("projects.description ilike :formattedValue", {
        formattedValue,
      })
      .orWhere("projects.status ilike :formattedValue", {
        formattedValue,
      })
      .orderBy("projects.createdDate", "DESC")
      .skip(page * quantity)
      .take(quantity)
      .getMany();

    return { page, quantity: projects.length, projects };
  }

  static async getProjectsWithOpenVacancySubscriptions({
    page = 0,
    quantity = 10,
  }) {
    const actualDate = new Date();
    const projects = await AppDatasource.createQueryBuilder()
      .select("projects")
      .from(Projects, "projects")
      .where("projects.closeDate >= :actualDate", { actualDate })
      .orderBy("projects.createdDate", "DESC")
      .skip(page * quantity)
      .take(quantity)
      .getMany();

    return { page, quantity: projects.length, projects };
  }

  static async getUnfinishedProjects({ page = 0, quantity = 10 }) {
    const projects = await AppDatasource.createQueryBuilder()
      .select("projects")
      .from(Projects, "projects")
      .where("projects.status != :finishedStatus", {
        finishedStatus: projectStatus[2],
      })
      .orderBy("projects.createdDate", "DESC")
      .skip(page * quantity)
      .take(quantity)
      .getMany();

    return { page, quantity: projects.length, projects };
  }

  static async getProjectsByMemberSelectionMethod(
    memberSelectionMethod,
    { page = 0, quantity = 10 }
  ) {
    const projects = await AppDatasource.createQueryBuilder()
      .select("projects")
      .from(Projects, "projects")
      .where("projects.memberSelectionMethod = :memberSelectionMethod", {
        memberSelectionMethod,
      })
      .orderBy("projects.createdDate", "DESC")
      .skip(page * quantity)
      .take(quantity)
      .getMany();

    return { page, quantity: projects.length, projects };
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
