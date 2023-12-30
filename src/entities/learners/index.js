const { EntitySchema } = require("typeorm");

const Learners = new EntitySchema({
  synchronize: false,
  name: "learners",
  columns: {
    id: {
      generated: true,
      primary: true,
      type: "int",
    },
    vacancyId: {
      type: "int",
    },
    candidateId: {
      type: "int",
    },
    createdDate: {
      createDate: true,
      type: "timestamp",
    },
  },
  relations: {
    vacancy: {
      joinColumn: { name: "vacancyId" },
      inverseSide: "learners",
      target: "vacancies",
      type: "many-to-one",
    },
    candidate: {
      joinColumn: { name: "candidateId" },
      inverseSide: "learners",
      target: "users",
      type: "many-to-one",
    },
  },
});

module.exports = { Learners };
