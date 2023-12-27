class AddPermissionUserFk1703446719803 {
  name = "AddPermissionUserFk1703446719803";

  async up(queryRunner) {
    await queryRunner.query(`ALTER TABLE "users" ADD "permissionId" integer`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_fba1d16d693fbc4fa7becb96a8e" FOREIGN KEY ("permissionId") REFERENCES "permissions"("id") ON DELETE SET NULL ON UPDATE NO ACTION`
    );
  }

  async down(queryRunner) {
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_fba1d16d693fbc4fa7becb96a8e"`
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "permissionId"`);
  }
}

module.exports = { AddPermissionUserFk1703446719803 };
