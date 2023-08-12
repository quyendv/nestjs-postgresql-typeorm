import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateEntities1691857685012 implements MigrationInterface {
  name = 'CreateEntities1691857685012';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "question" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "text" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_21e5786aa0ea704ae185a79b2d5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE TYPE "public"."permission_level_enum" AS ENUM('0', '1', '2', '3', '4')`);
    await queryRunner.query(`CREATE TYPE "public"."permission_action_enum" AS ENUM('0', '1', '2', '3')`);
    await queryRunner.query(
      `CREATE TABLE "permission" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "level" "public"."permission_level_enum" NOT NULL DEFAULT '0', "action" "public"."permission_action_enum" NOT NULL, "userId" uuid, CONSTRAINT "PK_3b8b97af9d9d8807e41e6f48362" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "profileId" uuid, CONSTRAINT "REL_9466682df91534dd95e4dbaa61" UNIQUE ("profileId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "profile" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "gender" character varying NOT NULL, "photo" character varying NOT NULL, CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "question_categories" ("question" uuid NOT NULL, "category" uuid NOT NULL, CONSTRAINT "PK_30d006fb124b672855423830a13" PRIMARY KEY ("question", "category"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_840737f4e702dce860a2390c76" ON "question_categories" ("question") `);
    await queryRunner.query(`CREATE INDEX "IDX_b02a96aca5d4befaa521e6612e" ON "question_categories" ("category") `);
    await queryRunner.query(
      `ALTER TABLE "permission" ADD CONSTRAINT "FK_c60570051d297d8269fcdd9bc47" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_9466682df91534dd95e4dbaa616" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "question_categories" ADD CONSTRAINT "FK_840737f4e702dce860a2390c764" FOREIGN KEY ("question") REFERENCES "question"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "question_categories" ADD CONSTRAINT "FK_b02a96aca5d4befaa521e6612e0" FOREIGN KEY ("category") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "question_categories" DROP CONSTRAINT "FK_b02a96aca5d4befaa521e6612e0"`);
    await queryRunner.query(`ALTER TABLE "question_categories" DROP CONSTRAINT "FK_840737f4e702dce860a2390c764"`);
    await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_9466682df91534dd95e4dbaa616"`);
    await queryRunner.query(`ALTER TABLE "permission" DROP CONSTRAINT "FK_c60570051d297d8269fcdd9bc47"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_b02a96aca5d4befaa521e6612e"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_840737f4e702dce860a2390c76"`);
    await queryRunner.query(`DROP TABLE "question_categories"`);
    await queryRunner.query(`DROP TABLE "profile"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "permission"`);
    await queryRunner.query(`DROP TYPE "public"."permission_action_enum"`);
    await queryRunner.query(`DROP TYPE "public"."permission_level_enum"`);
    await queryRunner.query(`DROP TABLE "category"`);
    await queryRunner.query(`DROP TABLE "question"`);
  }
}
