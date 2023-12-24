class ChangePasswordColumnLength1703379858845 {
  name = "ChangePasswordColumnLength1703379858845";

  async up(queryRunner) {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "password" character varying(100) NOT NULL`
    );
  }

  async down(queryRunner) {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "password" character varying(12) NOT NULL`
    );
  }
}

module.exports = { ChangePasswordColumnLength1703379858845 };
