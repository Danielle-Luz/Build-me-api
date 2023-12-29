const { EntitySchema } = require("typeorm");

const Vacancies = new EntitySchema({
  name: "vacancies",
  columns: {
    id: {
      generated: true,
      primary: true,
      type: "int",
    },
    name: {
      length: 100,
      type: "varchar",
    },
    description: {
      type: "text",
      nullable: true,
    },
    createdDate: {
      createDate: true,
      type: "timestamp",
    },
    learnersLimit: {
      type: "int",
    },
    projectId: {
      type: "int",
    },
    chosenCandidateId: {
      type: "int",
      nullable: true,
    },
  },
  relations: {
    projectId: {
      joinColumn: { name: "projectId" },
      inverseSide: "vacancies",
      target: "projects",
      type: "many-to-one",
    },
    chosenCandidateId: {
      joinColumn: { name: "chosenCandidateId" },
      inverseSide: "vacancies",
      target: "users",
      type: "many-to-one",
    },
    subscriptions: {
      inverseSide: "vacancy",
      onDelete: "CASCADE",
      target: "vacancy_subscriptions",
      type: "one-to-many",
    },
  },
});

module.exports = { Vacancies };
