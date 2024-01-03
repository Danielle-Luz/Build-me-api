module.exports = class AddVacancyDropoutColumns1704243601914 {
  name = "AddVacancyDropoutColumns1704243601914";

  async up(queryRunner) {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "vacancyDropoutsNumber" integer NOT NULL DEFAULT '0'`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "vacancyBlockDate" TIMESTAMP`
    );
  }

  async down(queryRunner) {
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "vacancyBlockDate"`
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "vacancyDropoutsNumber"`
    );
  }
};
