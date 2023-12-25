const z = require("zod");

const newRatingSchema = z.object({
  comment: z.string(),
  grade: z.number().int().min(0).max(5),
  authorId: z.number().int(),
  ratedRecipientId: z.number().int(),
});

const updatedRatingSchema = newRatingSchema
  .pick({
    comment: true,
    grade: true,
  })
  .partial();

module.exports = { newRatingSchema, updatedRatingSchema };
