import 'reflect-metadata';
import { Connection, createConnection } from 'typeorm';

export default async (): Promise<Connection> => createConnection();
//   const defaultOptions = await getConnectionOptions();
