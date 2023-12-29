module.exports = class CreateVacancyRequirementsEntity1703658425731 {
  name = "CreateVacancyRequirementsEntity1703658425731";

  async up(queryRunner) {
    await queryRunner.query(
      `CREATE TABLE "vacancy_requirements" ("id" SERIAL NOT NULL, "vacancyId" integer NOT NULL, "technologyId" integer NOT NULL, "skillLevel" character varying(50) NOT NULL, CONSTRAINT "PK_ceccf63a90bb833250894d2261c" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "vacancy_requirements" ADD CONSTRAINT "FK_6c760ff39b809d7c7b978e14011" FOREIGN KEY ("vacancyId") REFERENCES "vacancies"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "vacancy_requirements" ADD CONSTRAINT "FK_7236d63e4c37180055496816c0e" FOREIGN KEY ("technologyId") REFERENCES "technologies"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  async down(queryRunner) {
    await queryRunner.query(
      `ALTER TABLE "vacancy_requirements" DROP CONSTRAINT "FK_7236d63e4c37180055496816c0e"`
    );
    await queryRunner.query(
      `ALTER TABLE "vacancy_requirements" DROP CONSTRAINT "FK_6c760ff39b809d7c7b978e14011"`
    );
    await queryRunner.query(`DROP TABLE "vacancy_requirements"`);
  }
};
