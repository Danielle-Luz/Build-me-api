const { VacanciesService } = require("../../services");

class VotationsMiddlewares {
  static async doesVacancyExist(request, response, nextMiddleware) {
    const isCreating = request.method == "POST";
    let vacancyId;

    if (isCreating) {
      vacancyId = request.validatedData.vacancyId;
    } else {
      vacancyId = request.params.vacancyId
        ? request.params.vacancyId
        : request.params.id;
    }

    if (vacancyId) {
      await VacanciesService.getVacancyById(vacancyId);
    }

    return nextMiddleware();
  }
}

module.exports = { VotationsMiddlewares };
