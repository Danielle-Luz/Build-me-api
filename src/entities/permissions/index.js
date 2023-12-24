const { EntitySchema } = require("typeorm");

exports.Permissions = new EntitySchema({
  name: "permissions",
  columns: {
    id: {
      generated: true,
      primary: true,
      type: "int",
    },
    create: { type: "boolean" },
    update: { type: "boolean" },
    read: { type: "boolean" },
    delete: { type: "boolean" },
  },
  relations: {
    role: {
      joinColumn: {
        name: "role_id",
      },
      inverseSide: "permissions",
      target: "roles",
      type: "many-to-one",
    },
    resource: {
      joinColumn: {
        name: "resource_id",
      },
      inverseSide: "permissions",
      target: "resources",
      type: "many-to-one",
    },
  },
});
