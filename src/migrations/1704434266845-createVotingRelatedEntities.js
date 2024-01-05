module.exports = class CreateVotingRelatedEntities1704434266845 {
  name = "CreateVotingRelatedEntities1704434266845";

  async up(queryRunner) {
    await queryRunner.query(
      `CREATE TABLE "votations" ("id" SERIAL NOT NULL, "vacancyId" integer NOT NULL, "isOpen" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_eb0a20155f7647cbcfd86c37c9b" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "votes" ("id" SERIAL NOT NULL, "votationId" integer NOT NULL DEFAULT '0', "voterId" integer NOT NULL, CONSTRAINT "PK_f3d9fd4a0af865152c3f59db8ff" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "votations" ADD CONSTRAINT "FK_24c86551080c16e09516670cc14" FOREIGN KEY ("vacancyId") REFERENCES "vacancies"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "votes" ADD CONSTRAINT "FK_1381c585cba8851158bae8a0d1c" FOREIGN KEY ("votationId") REFERENCES "votations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "votes" ADD CONSTRAINT "FK_dcc38940c4fffe707c10e061d2a" FOREIGN KEY ("voterId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  async down(queryRunner) {
    await queryRunner.query(
      `ALTER TABLE "votes" DROP CONSTRAINT "FK_dcc38940c4fffe707c10e061d2a"`
    );
    await queryRunner.query(
      `ALTER TABLE "votes" DROP CONSTRAINT "FK_1381c585cba8851158bae8a0d1c"`
    );
    await queryRunner.query(
      `ALTER TABLE "votations" DROP CONSTRAINT "FK_24c86551080c16e09516670cc14"`
    );
    await queryRunner.query(`DROP TABLE "votes"`);
    await queryRunner.query(`DROP TABLE "votations"`);
  }
};
