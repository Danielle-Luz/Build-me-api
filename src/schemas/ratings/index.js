const z = require("zod");

const newRatingSchema = z.object({
  comment: z.string(),
  grade: z.number().int().min(0).max(5),
  ratedRecipientId: z.number().int(),
});

const updatedRatingSchema = newRatingSchema
  .omit({
    ratedRecipientId: true,
  })
  .partial();

module.exports = { newRatingSchema, updatedRatingSchema };
