const { EntitySchema } = require("typeorm");

const Votations = new EntitySchema({
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
    inFavorVotes: {
      type: "int",
      default: 0,
    },
    againstVotes: {
      type: "int",
      default: 0,
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
