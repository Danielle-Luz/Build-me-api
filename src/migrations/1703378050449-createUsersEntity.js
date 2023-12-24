export class CreateUsersEntity1703378050449 {
  name = "CreateUsersEntity1703378050449";

  async up(queryRunner) {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying(30) NOT NULL, "firstName" character varying(40) NOT NULL, "lastName" character varying(50) NOT NULL, "email" character varying(120) NOT NULL, "password" character varying(12) NOT NULL, "github_username" character varying(50), "linkedin_url" text, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
    );
  }

  async down(queryRunner) {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
