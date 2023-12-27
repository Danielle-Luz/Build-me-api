class CreateLearnersEntity1703627739864 {
  name = "CreateLearnersEntity1703627739864";

  async up(queryRunner) {
    await queryRunner.query(
      `CREATE TABLE "learners" ("id" SERIAL NOT NULL, "vacancyId" integer NOT NULL, "candidateId" integer NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3e7273fda51b35b9c8e4f096d91" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "learners" ADD CONSTRAINT "FK_35f025925eefb5717499a11092d" FOREIGN KEY ("vacancyId") REFERENCES "vacancies"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "learners" ADD CONSTRAINT "FK_83887ef027645d8c5051d3ebfb0" FOREIGN KEY ("candidateId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  async down(queryRunner) {
    await queryRunner.query(
      `ALTER TABLE "learners" DROP CONSTRAINT "FK_83887ef027645d8c5051d3ebfb0"`
    );
    await queryRunner.query(
      `ALTER TABLE "learners" DROP CONSTRAINT "FK_35f025925eefb5717499a11092d"`
    );
    await queryRunner.query(`DROP TABLE "learners"`);
  }
}

module.exports = { CreateLearnersEntity1703627739864 };
