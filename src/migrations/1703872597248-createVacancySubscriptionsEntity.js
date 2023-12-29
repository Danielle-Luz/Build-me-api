module.exports = class CreateVacancySubscriptionsEntity1703872597248 {
  name = "CreateVacancySubscriptionsEntity1703872597248";

  async up(queryRunner) {
    await queryRunner.query(
      `CREATE TABLE "vacancy_subscriptions" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "vacancyId" integer NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_eba48fc2e708e52f992da4d78cf" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "vacancy_subscriptions" ADD CONSTRAINT "FK_ed6cf6625122dcf0065f44f0d96" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "vacancy_subscriptions" ADD CONSTRAINT "FK_ab2aaf615b4ae5302ef91e43893" FOREIGN KEY ("vacancyId") REFERENCES "vacancies"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  async down(queryRunner) {
    await queryRunner.query(
      `ALTER TABLE "vacancy_subscriptions" DROP CONSTRAINT "FK_ab2aaf615b4ae5302ef91e43893"`
    );
    await queryRunner.query(
      `ALTER TABLE "vacancy_subscriptions" DROP CONSTRAINT "FK_ed6cf6625122dcf0065f44f0d96"`
    );
    await queryRunner.query(`DROP TABLE "vacancy_subscriptions"`);
  }
};
