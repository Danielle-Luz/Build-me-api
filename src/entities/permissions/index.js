const { EntitySchema } = require("typeorm");

exports.Permissions = new EntitySchema({
  synchronize: false,
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
    roleId: {
      joinColumn: {
        name: "roleId",
      },
      inverseSide: "permissions",
      target: "roles",
      type: "many-to-one",
    },
    resourceId: {
      joinColumn: {
        name: "resourceId",
      },
      inverseSide: "permissions",
      target: "resources",
      type: "many-to-one",
    },
  },
});
