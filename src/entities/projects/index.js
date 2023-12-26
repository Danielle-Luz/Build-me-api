const { EntitySchema } = require("typeorm");
const { memberSelectionMethod } = require("../../enumValues");

exports.Projects = new EntitySchema({
  name: "projects",
  columns: {
    id: {
      generated: true,
      primary: true,
      type: "int",
    },
    name: {
      length: 100,
      type: "varchar",
    },
    description: {
      type: "text",
    },
    createdById: {
      type: "int",
    },
    createdDate: {
      createDate: true,
      type: "timestamp",
    },
    deletedDate: {
      deleteDate: true,
      type: "timestamp"
    },
    closeDate: {
      type: "timestamp",
      nullable: true,
    },
    repositoryUrl: {
      type: "text",
      nullable: true,
    },
    memberSelectionMethod: {
      length: 30,
      type: "varchar",
      enum: memberSelectionMethod,
    },
  },
  relations: {
    createdById: {
      joinColumn: { name: "createdById" },
      inverseSide: "projects",
      target: "users",
      type: "many-to-one",
    },
    ratings: {
      inverseSide: "projectId",
      onDelete: "CASCADE",
      target: "ratings",
      type: "one-to-many"
    }
  },
});
