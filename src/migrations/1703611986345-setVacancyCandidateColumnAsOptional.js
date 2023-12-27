class SetVacancyCandidateColumnAsOptional1703611986345 {
  name = "SetVacancyCandidateColumnAsOptional1703611986345";

  async up(queryRunner) {
    await queryRunner.query(
      `ALTER TABLE "vacancies" DROP CONSTRAINT "FK_0bda0421ec8c418883cb210efd3"`
    );
    await queryRunner.query(
      `ALTER TABLE "vacancies" ALTER COLUMN "chosenCandidateId" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "vacancies" ALTER COLUMN "chosenCandidateId" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "vacancies" ADD CONSTRAINT "FK_0bda0421ec8c418883cb210efd3" FOREIGN KEY ("chosenCandidateId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`
    );
  }

  async down(queryRunner) {
    await queryRunner.query(
      `ALTER TABLE "vacancies" DROP CONSTRAINT "FK_0bda0421ec8c418883cb210efd3"`
    );
    await queryRunner.query(
      `ALTER TABLE "vacancies" ALTER COLUMN "chosenCandidateId" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "vacancies" ALTER COLUMN "chosenCandidateId" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "vacancies" ADD CONSTRAINT "FK_0bda0421ec8c418883cb210efd3" FOREIGN KEY ("chosenCandidateId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`
    );
  }
}

module.exports = { SetVacancyCandidateColumnAsOptional1703611986345 };
