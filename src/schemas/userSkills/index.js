const z = require("zod");

const newUserSkillsSchema = z.object({
  userId: z.number(),
  technologyId: z.number(),
});

module.exports = {
  newUserSkillsSchema,
};
