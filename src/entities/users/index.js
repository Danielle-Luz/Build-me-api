const { EntitySchema } = require("typeorm");

exports.Users = new EntitySchema({
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
  },
  relations: {
    roleId: {
      joinColumn: {
        name: "roleId",
      },
      inverseSide: "users",
      target: "roles",
      type: "many-to-one",
    },
    ratingsMade: {
      inverseSide: "authorId",
      onDelete: "CASCADE",
      target: "ratings",
      type: "one-to-many",
    },
    ratingsReceived: {
      inverseSide: "ratedRecipientId",
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
      inverseSide: "chosenCandidateId",
      onDelete: "SET NULL",
      target: "vacancies",
      type: "one-to-many",
    },
  },
});
