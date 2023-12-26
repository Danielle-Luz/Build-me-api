class SetVacancyDescriptionAsOptional1703602747515 {
  name = "SetVacancyDescriptionAsOptional1703602747515";

  async up(queryRunner) {
    await queryRunner.query(
      `ALTER TABLE "vacancies" ALTER COLUMN "description" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "vacancies" ALTER COLUMN "description" DROP NOT NULL`
    );
  }

  async down(queryRunner) {
    await queryRunner.query(
      `ALTER TABLE "vacancies" ALTER COLUMN "description" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "vacancies" ALTER COLUMN "description" SET NOT NULL`
    );
  }
}

module.exports = { SetVacancyDescriptionAsOptional1703602747515 };
