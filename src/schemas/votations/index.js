const z = require("zod");

const newVotationSchema = z.object({
  vacancyId: z.number().int().positive(),
});

module.exports = { newVotationSchema };
