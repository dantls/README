import { MigrationInterface, QueryRunner } from 'typeorm';

export default class Migration1597547139316 implements MigrationInterface {
    name = 'Migration1597547139316'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "avatar" character varying NOT NULL, "whatsapp" character varying NOT NULL, "bio" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))');
      await queryRunner.query('CREATE TABLE "class_schedule" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "week_day" character varying NOT NULL, "from" integer NOT NULL, "to" integer NOT NULL, "class_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_544546bcb6f727f6e820b856522" PRIMARY KEY ("id"))');
      await queryRunner.query('CREATE TABLE "classes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "subject" character varying NOT NULL, "cost" character varying NOT NULL, "user_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e207aa15404e9b2ce35910f9f7f" PRIMARY KEY ("id"))');
      await queryRunner.query('ALTER TABLE "class_schedule" ADD CONSTRAINT "FK_0aa74ee427967d4c82f298511bc" FOREIGN KEY ("class_id") REFERENCES "classes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
      await queryRunner.query('ALTER TABLE "classes" ADD CONSTRAINT "FK_955ac25b387802b256a3e35aa95" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE "classes" DROP CONSTRAINT "FK_955ac25b387802b256a3e35aa95"');
      await queryRunner.query('ALTER TABLE "class_schedule" DROP CONSTRAINT "FK_0aa74ee427967d4c82f298511bc"');
      await queryRunner.query('DROP TABLE "classes"');
      await queryRunner.query('DROP TABLE "class_schedule"');
      await queryRunner.query('DROP TABLE "users"');
    }
}
