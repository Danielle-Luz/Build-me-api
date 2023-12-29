const { EntitySchema } = require("typeorm");

exports.UserSkills = new EntitySchema({
  name: "userSkills",
  columns: {
    id: {
      generated: true,
      primary: true,
      type: "int",
    },
    userId: {
      type: "int",
    },
    technologyId: {
      type: "int",
    },
    skillLevel: {
      length: 50,
      type: "varchar",
      default: "Básico",
    },
    score: {
      type: "int",
    },
  },
  relations: {
    userId: {
      joinColumn: { name: "userId" },
      inverseSide: "userSkills",
      target: "users",
      type: "many-to-one",
    },
    technologyId: {
      joinColumn: { name: "technologyId" },
      inverseSide: "userSkills",
      target: "technologies",
      type: "many-to-one",
    },
  },
});
