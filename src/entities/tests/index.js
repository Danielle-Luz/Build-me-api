const { EntitySchema } = require("typeorm");

const Tests = new EntitySchema({
  synchronize: false,
  name: "tests",
  columns: {
    id: {
      generated: true,
      primary: true,
      type: "int",
    },
    userId: {
      type: "int",
    },
    technologyId: { type: "int" },
    score: { type: "float" },
    createdDate: { createDate: true },
  },
  relations: {
    user: {
      target: "users",
      type: "many-to-one",
      joinColumn: {
        name: "userId",
      },
    },
    technology: {
      target: "technologies",
      type: "many-to-one",
      joinColumn: {
        name: "technologyId",
      },
    },
  },
});

module.exports = { Tests };
