module.exports = class AddFkColumnAndRemoveBooleanField1704176115586 {
  name = "AddFkColumnAndRemoveBooleanField1704176115586";

  async up(queryRunner) {
    await queryRunner.query(`ALTER TABLE "answers" DROP COLUMN "isRight"`);
    await queryRunner.query(
      `ALTER TABLE "questions" ADD "rightAnswerId" integer NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "questions" ADD CONSTRAINT "FK_dd6ed320fe6388a0e4af53a427d" FOREIGN KEY ("rightAnswerId") REFERENCES "answers"("id") ON DELETE SET NULL ON UPDATE NO ACTION`
    );
  }

  async down(queryRunner) {
    await queryRunner.query(
      `ALTER TABLE "questions" DROP CONSTRAINT "FK_dd6ed320fe6388a0e4af53a427d"`
    );
    await queryRunner.query(
      `ALTER TABLE "questions" DROP COLUMN "rightAnswerId"`
    );
    await queryRunner.query(
      `ALTER TABLE "answers" ADD "isRight" boolean NOT NULL DEFAULT false`
    );
  }
};
