import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDatabase1751201487617 implements MigrationInterface {
    name = 'InitDatabase1751201487617'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile" DROP CONSTRAINT "FK_a24972ebd73b106250713dcddd9"`);
        await queryRunner.query(`ALTER TABLE "profile" DROP CONSTRAINT "REL_a24972ebd73b106250713dcddd"`);
        await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "profileId" uuid`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_9466682df91534dd95e4dbaa616" UNIQUE ("profileId")`);
        await queryRunner.query(`ALTER TABLE "profile" ADD "avatar" character varying`);
        await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "bio"`);
        await queryRunner.query(`ALTER TABLE "profile" ADD "bio" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_9466682df91534dd95e4dbaa616" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_9466682df91534dd95e4dbaa616"`);
        await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "bio"`);
        await queryRunner.query(`ALTER TABLE "profile" ADD "bio" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "avatar"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_9466682df91534dd95e4dbaa616"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "profileId"`);
        await queryRunner.query(`ALTER TABLE "profile" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "profile" ADD CONSTRAINT "REL_a24972ebd73b106250713dcddd" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "profile" ADD CONSTRAINT "FK_a24972ebd73b106250713dcddd9" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
