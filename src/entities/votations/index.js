const { EntitySchema } = require("typeorm");

const Votations = new EntitySchema({
  synchronize: false,
  name: "votations",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    vacancyId: {
      type: "int",
    },
    isOpen: {
      type: "boolean",
      default: true,
    },
  },
  relations: {
    vacancy: {
      target: "vacancies",
      type: "many-to-one",
      joinColumn: {
        name: "vacancyId",
      },
    },
  },
});

module.exports = { Votations };
