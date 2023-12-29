module.exports = class CreateTechnologiesEntity1703654861847 {
  name = "CreateTechnologiesEntity1703654861847";

  async up(queryRunner) {
    await queryRunner.query(
      `CREATE TABLE "technologies" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "iconUrl" text, CONSTRAINT "UQ_46800813f460eb131823371caee" UNIQUE ("name"), CONSTRAINT "PK_9a97465b79568f00becacdd4e4a" PRIMARY KEY ("id"))`
    );
  }

  async down(queryRunner) {
    await queryRunner.query(`DROP TABLE "technologies"`);
  }
};
