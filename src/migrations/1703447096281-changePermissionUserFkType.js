class ChangePermissionUserFkType1703447096281 {
  name = "ChangePermissionUserFkType1703447096281";

  async up(queryRunner) {
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_fba1d16d693fbc4fa7becb96a8e"`
    );
    await queryRunner.query(
      `ALTER TABLE "users" RENAME COLUMN "permissionId" TO "roleId"`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_368e146b785b574f42ae9e53d5e" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  async down(queryRunner) {
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_368e146b785b574f42ae9e53d5e"`
    );
    await queryRunner.query(
      `ALTER TABLE "users" RENAME COLUMN "roleId" TO "permissionId"`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_fba1d16d693fbc4fa7becb96a8e" FOREIGN KEY ("permissionId") REFERENCES "permissions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}

module.exports = { ChangePermissionUserFkType1703447096281 };
