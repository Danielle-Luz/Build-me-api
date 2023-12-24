class CreatePermissionRelatedEntities1703436591926 {
  name = "CreatePermissionRelatedEntities1703436591926";

  async up(queryRunner) {
    await queryRunner.query(
      `CREATE TABLE "permissions" ("id" SERIAL NOT NULL, "create" boolean NOT NULL, "update" boolean NOT NULL, "read" boolean NOT NULL, "delete" boolean NOT NULL, "role_id" integer, "resource_id" integer, CONSTRAINT "PK_920331560282b8bd21bb02290df" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "resources" ("id" SERIAL NOT NULL, "name" character varying(30) NOT NULL, CONSTRAINT "PK_632484ab9dff41bba94f9b7c85e" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "roles" ("id" SERIAL NOT NULL, "name" character varying(30) NOT NULL, CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "permissions" ADD CONSTRAINT "FK_f10931e7bb05a3b434642ed2797" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "permissions" ADD CONSTRAINT "FK_a5b7bf2f14f8df49fc610e9a8be" FOREIGN KEY ("resource_id") REFERENCES "resources"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  async down(queryRunner) {
    await queryRunner.query(
      `ALTER TABLE "permissions" DROP CONSTRAINT "FK_a5b7bf2f14f8df49fc610e9a8be"`
    );
    await queryRunner.query(
      `ALTER TABLE "permissions" DROP CONSTRAINT "FK_f10931e7bb05a3b434642ed2797"`
    );
    await queryRunner.query(`DROP TABLE "roles"`);
    await queryRunner.query(`DROP TABLE "resources"`);
    await queryRunner.query(`DROP TABLE "permissions"`);
  }
}

module.exports = { CreatePermissionRelatedEntities1703436591926 };
