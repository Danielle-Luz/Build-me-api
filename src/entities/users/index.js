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
      name: "github_username",
      length: 50,
      nullable: true,
      type: "varchar",
    },
    linkedinUrl: { name: "linkedin_url", type: "text", nullable: true },
  },
  relations: {
    roleId: {
      joinColumn: {
        name: "roleId",
      },
      inverseSide: "users",
      target: "roles",
      type: "many-to-one",
    }
  }
});
