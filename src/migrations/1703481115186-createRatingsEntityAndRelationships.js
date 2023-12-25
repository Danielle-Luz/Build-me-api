class CreateRatingsEntityAndRelationships1703481115186 {
  name = "CreateRatingsEntityAndRelationships1703481115186";

  async up(queryRunner) {
    await queryRunner.query(
      `CREATE TABLE "ratings" ("id" SERIAL NOT NULL, "comment" text NOT NULL, "grade" integer NOT NULL, "authorId" integer, "ratedRecipientId" integer, CONSTRAINT "CHK_6a9a1bbcccc249d47eb7704df1" CHECK (grade >= 0 AND grade <= 5), CONSTRAINT "PK_0f31425b073219379545ad68ed9" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "ratings" ADD CONSTRAINT "FK_b973cc1da1828672b43ab63ea06" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "ratings" ADD CONSTRAINT "FK_92be448d3bdc7d63ea261182120" FOREIGN KEY ("ratedRecipientId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  async down(queryRunner) {
    await queryRunner.query(
      `ALTER TABLE "ratings" DROP CONSTRAINT "FK_92be448d3bdc7d63ea261182120"`
    );
    await queryRunner.query(
      `ALTER TABLE "ratings" DROP CONSTRAINT "FK_b973cc1da1828672b43ab63ea06"`
    );
    await queryRunner.query(`DROP TABLE "ratings"`);
  }
}

module.exports = { CreateRatingsEntityAndRelationships1703481115186 };
