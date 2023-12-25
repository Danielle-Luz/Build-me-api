const { EntitySchema } = require("typeorm");

exports.Ratings = new EntitySchema({
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
  },
  relations: {
    authorId: {
      joinColumn: {
        name: "authorId",
      },
      inverseSide: "ratingsMade",
      target: "users",
      type: "many-to-one",
    },
    ratedRecipientId: {
      joinColumn: {
        name: "ratedRecipientId",
      },
      inverseSide: "ratingsReceived",
      target: "users",
      type: "many-to-one",
    },
  },
  checks: [{ expression: "grade >= 0 AND grade <= 5" }],
});
