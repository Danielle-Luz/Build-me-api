const { EntitySchema } = require("typeorm");

exports.Resources = new EntitySchema({
  name: "resources",
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
      inverseSide: "resource",
      onDelete: "CASCADE",
      target: "permissions",
      type: "one-to-many",
    },
  },
});
