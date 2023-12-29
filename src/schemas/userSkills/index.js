const z = require("zod");

const userSkillsSchema = z.object({
  technologyId: z.number(),
});

module.exports = {
  userSkillsSchema,
};
