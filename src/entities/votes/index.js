const { EntitySchema } = require("typeorm");

const Votes = new EntitySchema({
  synchronize: false,
  name: "votes",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    votationId: {
      type: "int",
      default: 0,
    },
    voterId: {
      type: "int",
    },
  },
  relations: {
    votation: {
      target: "votations",
      type: "many-to-one",
      joinColumn: {
        name: "votationId",
      },
    },
    voter: {
      target: "users",
      type: "many-to-one",
      inverseSide: "voters",
      joinColumn: {
        name: "voterId",
      },
    },
  },
});

module.exports = { Votes };
