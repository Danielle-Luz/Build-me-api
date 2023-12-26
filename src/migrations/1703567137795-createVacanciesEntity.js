class CreateVacanciesEntity1703567137795 {
  name = "CreateVacanciesEntity1703567137795";

  async up(queryRunner) {
    await queryRunner.query(
      `CREATE TABLE "vacancies" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "description" text NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "learnersLimit" integer NOT NULL, "projectId" integer NOT NULL, CONSTRAINT "PK_3b45154a366568190cc15be2906" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_368e146b785b574f42ae9e53d5e"`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "roleId" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "ratings" DROP CONSTRAINT "FK_b973cc1da1828672b43ab63ea06"`
    );
    await queryRunner.query(
      `ALTER TABLE "ratings" DROP CONSTRAINT "FK_92be448d3bdc7d63ea261182120"`
    );
    await queryRunner.query(
      `ALTER TABLE "ratings" ALTER COLUMN "authorId" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "ratings" ALTER COLUMN "ratedRecipientId" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "ratings" ALTER COLUMN "authorId" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "ratings" ALTER COLUMN "ratedRecipientId" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "roleId" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_368e146b785b574f42ae9e53d5e" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "ratings" ADD CONSTRAINT "FK_b973cc1da1828672b43ab63ea06" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "ratings" ADD CONSTRAINT "FK_92be448d3bdc7d63ea261182120" FOREIGN KEY ("ratedRecipientId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "vacancies" ADD CONSTRAINT "FK_786c13db9a3bf71ab5534f6e82a" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  async down(queryRunner) {
    await queryRunner.query(
      `ALTER TABLE "vacancies" DROP CONSTRAINT "FK_786c13db9a3bf71ab5534f6e82a"`
    );
    await queryRunner.query(
      `ALTER TABLE "ratings" DROP CONSTRAINT "FK_92be448d3bdc7d63ea261182120"`
    );
    await queryRunner.query(
      `ALTER TABLE "ratings" DROP CONSTRAINT "FK_b973cc1da1828672b43ab63ea06"`
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_368e146b785b574f42ae9e53d5e"`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "roleId" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "ratings" ALTER COLUMN "ratedRecipientId" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "ratings" ALTER COLUMN "authorId" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "ratings" ALTER COLUMN "ratedRecipientId" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "ratings" ALTER COLUMN "authorId" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "ratings" ADD CONSTRAINT "FK_92be448d3bdc7d63ea261182120" FOREIGN KEY ("ratedRecipientId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "ratings" ADD CONSTRAINT "FK_b973cc1da1828672b43ab63ea06" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "roleId" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_368e146b785b574f42ae9e53d5e" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(`DROP TABLE "vacancies"`);
  }
}

module.exports = { CreateVacanciesEntity1703567137795 };
