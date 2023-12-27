const { EntitySchema } = require("typeorm");

exports.VacancyRequirements = new EntitySchema({
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
    vacancyId: {
      joinColumn: { name: "vacancyId" },
      inverseSide: "vacancyRequirements",
      target: "vacancies",
      type: "many-to-one",
    },
    technologyId: {
      joinColumn: { name: "technologyId" },
      inverseSide: "vacancyRequirements",
      target: "technologies",
      type: "many-to-one",
    },
  },
});
