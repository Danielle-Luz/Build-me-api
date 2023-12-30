const { EntitySchema } = require("typeorm");

const UserSkills = new EntitySchema({
  synchronize: false,
  name: "user_skills",
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
      default: 0,
    },
  },
  relations: {
    user: {
      joinColumn: { name: "userId" },
      inverseSide: "userSkills",
      target: "users",
      type: "many-to-one",
    },
    technology: {
      joinColumn: { name: "technologyId" },
      inverseSide: "userSkills",
      target: "technologies",
      type: "many-to-one",
    },
  },
});

module.exports = { UserSkills };
