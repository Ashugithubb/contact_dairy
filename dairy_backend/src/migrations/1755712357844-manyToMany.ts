import { MigrationInterface, QueryRunner } from "typeorm";

export class ManyToMany1755712357844 implements MigrationInterface {
    name = 'ManyToMany1755712357844'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "contact_tag" ("contact_id" integer NOT NULL, "tag_id" integer NOT NULL, CONSTRAINT "PK_9296287eff238d56c7bf620d37e" PRIMARY KEY ("contact_id", "tag_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_40c598b4b2413200705f4c580a" ON "contact_tag" ("contact_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_10a33635dea2deaa247108aaf1" ON "contact_tag" ("tag_id") `);
        await queryRunner.query(`ALTER TABLE "contact_tag" ADD CONSTRAINT "FK_40c598b4b2413200705f4c580aa" FOREIGN KEY ("contact_id") REFERENCES "contacts"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "contact_tag" ADD CONSTRAINT "FK_10a33635dea2deaa247108aaf1a" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contact_tag" DROP CONSTRAINT "FK_10a33635dea2deaa247108aaf1a"`);
        await queryRunner.query(`ALTER TABLE "contact_tag" DROP CONSTRAINT "FK_40c598b4b2413200705f4c580aa"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_10a33635dea2deaa247108aaf1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_40c598b4b2413200705f4c580a"`);
        await queryRunner.query(`DROP TABLE "contact_tag"`);
    }

}
