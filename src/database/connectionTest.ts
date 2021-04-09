/* eslint-disable no-shadow */
import 'reflect-metadata';
import { createConnection, getConnection, getConnectionOptions } from 'typeorm';

const connection = {
  async create() {
    const defaultOptions = await getConnectionOptions();
    const connection = await createConnection(
      Object.assign(defaultOptions, {
        database:
          process.env.NODE_ENV === 'test' ? 'tokenlab_test' : 'tokenlab',
      })
    );
    return connection;
  },

  async close() {
    await getConnection().close();
  },

  async clear() {
    const connection = getConnection();
    const entities = connection.entityMetadatas;

    entities.forEach(async (entity) => {
      const repository = connection.getRepository(entity.name);
      await repository.query(`DELETE FROM ${entity.tableName}`);
    });
  },
};
export default connection;
