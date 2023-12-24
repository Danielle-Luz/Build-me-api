const { EntitySchema } = require("typeorm");

exports.Roles = new EntitySchema({
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
    },
  },
  relations: {
    permissions: {
      inverseSide: "role",
      onDelete: "CASCADE",
      target: "permissions",
      type: "one-to-many",
    },
  },
});
