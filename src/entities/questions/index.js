const { EntitySchema } = require("typeorm");

const Questions = new EntitySchema({
  name: "questions",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    question: {
      type: "text",
    },
    technologyId: {
      type: "int",
    },
    difficultyLevel: {
      type: "int",
    },
  },
  relations: {
    technology: {
      target: "technologies",
      type: "many-to-one",
      joinColumn: {
        name: "technologyId",
      },
    },
  },
  checks: [{ expression: `"difficultyLevel" >= 1 AND "difficultyLevel" <= 3` }],
});

module.exports = { Questions };
