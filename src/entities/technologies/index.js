const { EntitySchema } = require("typeorm");

const Technologies = new EntitySchema({
  name: "technologies",
  columns: {
    id: {
      generated: true,
      primary: true,
      type: "int",
    },
    name: {
      length: 50,
      type: "varchar",
      unique: true,
    },
    iconUrl: {
      type: "text",
      nullable: true,
    },
  },
});

module.exports = { Technologies };
