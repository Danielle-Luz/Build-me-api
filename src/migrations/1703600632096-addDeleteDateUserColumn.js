class AddDeleteDateUserColumn1703600632096 {
  name = "AddDeleteDateUserColumn1703600632096";

  async up(queryRunner) {
    await queryRunner.query(`ALTER TABLE "users" ADD "deletedDate" TIMESTAMP`);
    await queryRunner.query(
      `ALTER TABLE "vacancies" ADD "chosenCandidateId" integer NOT NULL`
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
      `ALTER TABLE "vacancies" DROP COLUMN "chosenCandidateId"`
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deletedDate"`);
  }
}

module.exports = { AddDeleteDateUserColumn1703600632096 };
