const { EntitySchema } = require("typeorm");

const Permissions = new EntitySchema({
  synchronize: false,
  name: "permissions",
  columns: {
    id: {
      generated: true,
      primary: true,
      type: "int",
    },
    roleId: {
      type: "int",
    },
    resourceId: {
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
        name: "roleId",
      },
      inverseSide: "permissions",
      target: "roles",
      type: "many-to-one",
    },
    resource: {
      joinColumn: {
        name: "resourceId",
      },
      inverseSide: "permissions",
      target: "resources",
      type: "many-to-one",
    },
  },
});

module.exports = { Permissions };
