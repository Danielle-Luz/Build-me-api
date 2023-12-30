const { EntitySchema } = require("typeorm");

const VacancyRequirements = new EntitySchema({
  synchronize: false,
  name: "vacancy_requirements",
  columns: {
    id: {
      generated: true,
      primary: true,
      type: "int",
    },
    vacancyId: {
      type: "int",
    },
    technologyId: {
      type: "int",
    },
    skillLevel: {
      length: 50,
      type: "varchar",
    },
  },
  relations: {
    vacancy: {
      joinColumn: { name: "vacancyId" },
      inverseSide: "vacancyRequirements",
      target: "vacancies",
      type: "many-to-one",
    },
    technology: {
      joinColumn: { name: "technologyId" },
      inverseSide: "vacancyRequirements",
      target: "technologies",
      type: "many-to-one",
    },
  },
});

module.exports = { VacancyRequirements };
