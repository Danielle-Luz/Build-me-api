const { EntitySchema } = require("typeorm");

const VacancySubscriptions = new EntitySchema({
  name: "vacancy_subscriptions",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    userId: {
      type: "int",
    },
    vacancyId: {
      type: "int",
    },
    createdDate: {
      type: "timestamp",
      createDate: true,
    },
  },
  relations: {
    user: {
      target: "users",
      type: "many-to-one",
      joinColumn: {
        name: "userId",
      },
    },
    vacancy: {
      target: "vacancies",
      type: "many-to-one",
      joinColumn: {
        name: "vacancyId",
      },
    },
  },
});

module.exports = { VacancySubscriptions };
