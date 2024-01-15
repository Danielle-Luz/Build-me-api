const { AppDatasource } = require("../../data-source");
const { Vacancies } = require("../../entities");
const schedule = require("node-schedule");

class ProjectsHelper {
  static scheduleCandidatesSelectionOnCloseDate(
    projectId,
    projectCloseDate
  ) {
    const schenduleRule = new schedule.RecurrenceRule();
    schenduleRule.tz = "America/Bahia";
    schenduleRule.year = projectCloseDate.getFullYear();
    schenduleRule.month = projectCloseDate.getMonth();
    schenduleRule.date = projectCloseDate.getUTCDate();
    schenduleRule.hour = 1;
    schenduleRule.minute = 0;
    schenduleRule.second = 0;

    schedule.scheduleJob(schenduleRule, () =>
      ProjectsHelper.updateRelatedVacanciesWithRandomlyChooseCandidates(
        projectId
      )
    );
  }

  static async updateRelatedVacanciesWithRandomlyChooseCandidates(projectId) {
    const vacanciesWithSubscriptions =
      await ProjectsHelper.getProjectRelatedVacanciesWithSubscriptions(
        projectId
      );

    const vacanciesWithRandomCandidates =
      ProjectsHelper.getVacanciesWithRandomCandidates(
        vacanciesWithSubscriptions
      );

    AppDatasource.getRepository(Vacancies).save(vacanciesWithRandomCandidates);
  }

  static async getProjectRelatedVacanciesWithSubscriptions(projectId) {
    return AppDatasource.createQueryBuilder()
      .select("vacancies")
      .from(Vacancies, "vacancies")
      .where("vacancies.projectId = :projectId", { projectId })
      .andWhere("vacancies.chosenCandidateId is null")
      .innerJoinAndSelect("vacancies.subscriptions", "subscriptions")
      .getMany();
  }

  static getVacanciesWithRandomCandidates(vacanciesWithSubscriptions) {
    return vacanciesWithSubscriptions.map(({ id, subscriptions }) => {
      const randomIndex = Math.floor(Math.random() * subscriptions.length);
      const { userId } = subscriptions[randomIndex];

      const updatedVacancyData = { id, chosenCandidateId: userId };

      return updatedVacancyData;
    });
  }
}

module.exports = { ProjectsHelper };
