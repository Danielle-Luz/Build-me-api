module.exports = class CreateQuestionsAndAnswersEntities1704080682822 {
  name = "CreateQuestionsAndAnswersEntities1704080682822";

  async up(queryRunner) {
    await queryRunner.query(
      `CREATE TABLE "answers" ("id" SERIAL NOT NULL, "answer" text NOT NULL, "questionId" integer NOT NULL, "isRight" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_9c32cec6c71e06da0254f2226c6" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "questions" ("id" SERIAL NOT NULL, "question" text NOT NULL, "technologyId" integer NOT NULL, "difficultyLevel" integer NOT NULL, CONSTRAINT "CHK_710e397fbc8b44c4e7f4ec8996" CHECK ("difficultyLevel" >= 1 AND "difficultyLevel" <= 3), CONSTRAINT "PK_08a6d4b0f49ff300bf3a0ca60ac" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "answers" ADD CONSTRAINT "FK_c38697a57844f52584abdb878d7" FOREIGN KEY ("questionId") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "questions" ADD CONSTRAINT "FK_0df6cb03ac380672ae94b1dbb66" FOREIGN KEY ("technologyId") REFERENCES "technologies"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  async down(queryRunner) {
    await queryRunner.query(
      `ALTER TABLE "questions" DROP CONSTRAINT "FK_0df6cb03ac380672ae94b1dbb66"`
    );
    await queryRunner.query(
      `ALTER TABLE "answers" DROP CONSTRAINT "FK_c38697a57844f52584abdb878d7"`
    );
    await queryRunner.query(`DROP TABLE "questions"`);
    await queryRunner.query(`DROP TABLE "answers"`);
  }
};
