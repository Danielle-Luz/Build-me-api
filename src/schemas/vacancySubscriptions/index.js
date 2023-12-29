const z = require("zod");

const newVacancySubscriptionSchema = z.object({
  vacancyId: z.number(),
});

module.exports = { newVacancySubscriptionSchema };
