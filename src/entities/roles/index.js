const { EntitySchema } = require("typeorm");

const Roles = new EntitySchema({
  synchronize: false,
  name: "roles",
  columns: {
    id: {
      generated: true,
      primary: true,
      type: "int",
    },
    name: {
      length: 30,
      type: "varchar",
      unique: true,
    },
  },
  relations: {
    permissions: {
      inverseSide: "roleId",
      onDelete: "CASCADE",
      target: "permissions",
      type: "one-to-many",
    },
    users: {
      inverseSide: "roleId",
      onDelete: "SET NULL",
      target: "users",
      type: "one-to-many",
    },
  },
});

module.exports = { Roles };
