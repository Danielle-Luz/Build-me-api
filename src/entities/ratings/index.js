const { EntitySchema } = require("typeorm");

const Ratings = new EntitySchema({
  synchronize: false,
  name: "ratings",
  columns: {
    id: {
      generated: true,
      primary: true,
      type: "int",
    },
    comment: {
      type: "text",
    },
    grade: {
      type: "int",
    },
    createdDate: {
      createDate: true,
      type: "timestamp",
    },
    authorId: {
      type: "int",
    },
    ratedRecipientId: {
      type: "int",
    },
    projectId: {
      type: "int",
    },
  },
  relations: {
    author: {
      joinColumn: {
        name: "authorId",
      },
      inverseSide: "ratingsMade",
      target: "users",
      type: "many-to-one",
    },
    ratedRecipient: {
      joinColumn: {
        name: "ratedRecipientId",
      },
      inverseSide: "ratingsReceived",
      target: "users",
      type: "many-to-one",
    },
    projectId: {
      joinColumn: {
        name: "projectId",
      },
      inverseSide: "ratings",
      target: "projects",
      type: "many-to-one",
    },
  },
  checks: [{ expression: "grade >= 0 AND grade <= 5" }],
});

module.exports = { Ratings };
