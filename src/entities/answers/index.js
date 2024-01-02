const { EntitySchema } = require("typeorm");

const Answers = new EntitySchema({
  name: "answers",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    answer: {
      type: "text",
    },
    questionId: {
      type: "int",
    },
  },
  relations: {
    question: {
      target: "questions",
      type: "many-to-one",
      joinColumn: {
        name: "questionId",
      },
    },
  },
});

module.exports = { Answers };
