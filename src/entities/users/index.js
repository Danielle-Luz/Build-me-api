const { EntitySchema } = require("typeorm");

const Users = new EntitySchema({
  synchronize: false,
  name: "users",
  columns: {
    id: {
      generated: true,
      primary: true,
      type: "int",
    },
    username: {
      length: 30,
      type: "varchar",
      unique: true,
    },
    firstName: { length: 40, type: "varchar" },
    lastName: { length: 50, type: "varchar" },
    email: { length: 120, type: "varchar", unique: true },
    password: { length: 100, type: "varchar" },
    githubUsername: {
      length: 50,
      nullable: true,
      type: "varchar",
    },
    linkedinUrl: { type: "text", nullable: true },
    profilePicture: { type: "text", nullable: true },
    roleId: { type: "int" },
    deletedDate: { type: "timestamp", deleteDate: true },
    vacancyDropoutsNumber: { type: "int", default: 0 },
    vacancyBlockDate: { type: "timestamp", nullable: true },
  },
  relations: {
    role: {
      joinColumn: {
        name: "roleId",
      },
      inverseSide: "users",
      target: "roles",
      type: "many-to-one",
    },
    ratingsMade: {
      inverseSide: "author",
      onDelete: "CASCADE",
      target: "ratings",
      type: "one-to-many",
    },
    ratingsReceived: {
      inverseSide: "ratedRecipient",
      onDelete: "CASCADE",
      target: "ratings",
      type: "one-to-many",
    },
    projects: {
      inverseSide: "createdById",
      onDelete: "SET NULL",
      target: "projects",
      type: "one-to-many",
    },
    vacancies: {
      inverseSide: "chosenCandidate",
      onDelete: "SET NULL",
      target: "vacancies",
      type: "one-to-many",
    },
    subscriptions: {
      inverseSide: "user",
      onDelete: "CASCADE",
      target: "vacancy_subscriptions",
      type: "one-to-many",
    },
    learners: {
      inverseSide: "candidate",
      onDelete: "CASCADE",
      target: "learners",
      type: "one-to-many",
    },
    voters: {
      inverseSide: "voter",
      onDelete: "CASCADE",
      target: "votes",
      type: "one-to-many",
    },
  },
});

module.exports = { Users };
