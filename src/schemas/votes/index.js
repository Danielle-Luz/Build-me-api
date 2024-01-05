const z = require("zod");

const newVoteSchema = z.object({
  votationId: z.number().int().positive(),
});

module.exports = { newVoteSchema };
