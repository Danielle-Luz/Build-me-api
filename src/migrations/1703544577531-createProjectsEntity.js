class CreateProjectsEntity1703544577531 {
  name = "CreateProjectsEntity1703544577531";

  async up(queryRunner) {
    await queryRunner.query(
      `CREATE TABLE "projects" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "description" text NOT NULL, "createdById" integer NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "closeDate" TIMESTAMP, "repositoryUrl" text, "memberSelectionMethod" character varying(30) NOT NULL, CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "ratings" ADD "projectId" integer NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "projects" ADD CONSTRAINT "FK_f55144dc92df43cd1dad5d29b90" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "ratings" ADD CONSTRAINT "FK_bcbc72d958b4ecd1fa378457488" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE SET NULL ON UPDATE NO ACTION`
    );
  }

  async down(queryRunner) {
    await queryRunner.query(
      `ALTER TABLE "ratings" DROP CONSTRAINT "FK_bcbc72d958b4ecd1fa378457488"`
    );
    await queryRunner.query(
      `ALTER TABLE "projects" DROP CONSTRAINT "FK_f55144dc92df43cd1dad5d29b90"`
    );
    await queryRunner.query(`ALTER TABLE "ratings" DROP COLUMN "projectId"`);
    await queryRunner.query(`DROP TABLE "projects"`);
  }
}

module.exports = { CreateProjectsEntity1703544577531 };
