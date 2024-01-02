const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class CreateTestsEntity1704218220317 {
    name = 'CreateTestsEntity1704218220317'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "tests" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "technologyId" integer NOT NULL, "score" double precision NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4301ca51edf839623386860aed2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tests" ADD CONSTRAINT "FK_9b4193834978a419a4d477940da" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tests" ADD CONSTRAINT "FK_04ec52dc3ecd94e2197ba72f102" FOREIGN KEY ("technologyId") REFERENCES "technologies"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "tests" DROP CONSTRAINT "FK_04ec52dc3ecd94e2197ba72f102"`);
        await queryRunner.query(`ALTER TABLE "tests" DROP CONSTRAINT "FK_9b4193834978a419a4d477940da"`);
        await queryRunner.query(`DROP TABLE "tests"`);
    }
}
