const { EntitySchema } = require("typeorm");

const Questions = new EntitySchema({
  synchronize: false,
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
    answers: {
      inverseSide: "question",
      target: "answers",
      type: "one-to-many",
      eager: true,
    },
  },
  checks: [{ expression: `"difficultyLevel" >= 1 AND "difficultyLevel" <= 3` }],
});

module.exports = { Questions };
