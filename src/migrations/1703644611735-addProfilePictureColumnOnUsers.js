class AddProfilePictureColumnOnUsers1703644611735 {
  name = "AddProfilePictureColumnOnUsers1703644611735";

  async up(queryRunner) {
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "github_username"`
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "linkedin_url"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "githubUsername" character varying(50)`
    );
    await queryRunner.query(`ALTER TABLE "users" ADD "linkedinUrl" text`);
    await queryRunner.query(`ALTER TABLE "users" ADD "profilePicture" text`);
  }

  async down(queryRunner) {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "profilePicture"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "linkedinUrl"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "githubUsername"`);
    await queryRunner.query(`ALTER TABLE "users" ADD "linkedin_url" text`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "github_username" character varying(50)`
    );
  }
}

module.exports = { AddProfilePictureColumnOnUsers1703644611735 };
