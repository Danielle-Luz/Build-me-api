const { EntitySchema } = require("typeorm");

exports.Resources = new EntitySchema({
  synchronize: false,
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
      unique: true,
    },
  },
  relations: {
    permissions: {
      inverseSide: "resourceId",
      onDelete: "CASCADE",
      target: "permissions",
      type: "one-to-many",
    },
  },
});
