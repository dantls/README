import {
  MigrationInterface, QueryRunner, TableColumn, TableForeignKey,
} from 'typeorm';

export default class AddUserToConnections1597383038475 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('connections',
      new TableColumn({
        name: 'user_id',
        type: 'uuid',
        isNullable: true,
      }));

    await queryRunner.createForeignKey(
      'connections',
      new TableForeignKey({
        name: 'ConnectionsUser',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('connections', 'ConnectionsUser');
    await queryRunner.dropColumn('connections', 'user_id');
  }
}
