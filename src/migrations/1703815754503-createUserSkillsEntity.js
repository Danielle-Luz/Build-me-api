module.exports = class CreateUserSkillsEntity1703815754503 {
  name = "CreateUserSkillsEntity1703815754503";

  async up(queryRunner) {
    await queryRunner.query(
      `CREATE TABLE "user_skills" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "technologyId" integer NOT NULL, "skillLevel" character varying(50) NOT NULL DEFAULT 'Básico', "score" integer NOT NULL, CONSTRAINT "PK_4d0a72117fbf387752dbc8506af" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "user_skills" ADD CONSTRAINT "FK_60177dd93dcdc055e4eaa93bade" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "user_skills" ADD CONSTRAINT "FK_be18fc0b90df4ad853594ad175f" FOREIGN KEY ("technologyId") REFERENCES "technologies"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  async down(queryRunner) {
    await queryRunner.query(
      `ALTER TABLE "user_skills" DROP CONSTRAINT "FK_be18fc0b90df4ad853594ad175f"`
    );
    await queryRunner.query(
      `ALTER TABLE "user_skills" DROP CONSTRAINT "FK_60177dd93dcdc055e4eaa93bade"`
    );
    await queryRunner.query(`DROP TABLE "user_skills"`);
  }
};
