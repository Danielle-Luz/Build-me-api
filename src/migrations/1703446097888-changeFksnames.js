class ChangeFksnames1703446097888 {
  name = "ChangeFksnames1703446097888";

  async up(queryRunner) {
    await queryRunner.query(
      `ALTER TABLE "permissions" DROP CONSTRAINT "FK_f10931e7bb05a3b434642ed2797"`
    );
    await queryRunner.query(
      `ALTER TABLE "permissions" DROP CONSTRAINT "FK_a5b7bf2f14f8df49fc610e9a8be"`
    );
    await queryRunner.query(`ALTER TABLE "permissions" DROP COLUMN "role_id"`);
    await queryRunner.query(
      `ALTER TABLE "permissions" DROP COLUMN "resource_id"`
    );
    await queryRunner.query(`ALTER TABLE "permissions" ADD "roleId" integer`);
    await queryRunner.query(
      `ALTER TABLE "permissions" ADD "resourceId" integer`
    );
    await queryRunner.query(
      `ALTER TABLE "permissions" ADD CONSTRAINT "FK_36d7b8e1a331102ec9161e879ce" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE SET NULL ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "permissions" ADD CONSTRAINT "FK_ae8dcf78abc81b7eff867875560" FOREIGN KEY ("resourceId") REFERENCES "resources"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  async down(queryRunner) {
    await queryRunner.query(
      `ALTER TABLE "permissions" DROP CONSTRAINT "FK_ae8dcf78abc81b7eff867875560"`
    );
    await queryRunner.query(
      `ALTER TABLE "permissions" DROP CONSTRAINT "FK_36d7b8e1a331102ec9161e879ce"`
    );
    await queryRunner.query(
      `ALTER TABLE "permissions" DROP COLUMN "resourceId"`
    );
    await queryRunner.query(`ALTER TABLE "permissions" DROP COLUMN "roleId"`);
    await queryRunner.query(
      `ALTER TABLE "permissions" ADD "resource_id" integer`
    );
    await queryRunner.query(`ALTER TABLE "permissions" ADD "role_id" integer`);
    await queryRunner.query(
      `ALTER TABLE "permissions" ADD CONSTRAINT "FK_a5b7bf2f14f8df49fc610e9a8be" FOREIGN KEY ("resource_id") REFERENCES "resources"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "permissions" ADD CONSTRAINT "FK_f10931e7bb05a3b434642ed2797" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE SET NULL ON UPDATE NO ACTION`
    );
  }
}

module.exports = { ChangeFksnames1703446097888 };
