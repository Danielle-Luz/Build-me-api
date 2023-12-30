const z = require("zod");

const userSkillsSchema = z.object({
  technologyId: z.number().int().positive(),
});

module.exports = {
  userSkillsSchema,
};
