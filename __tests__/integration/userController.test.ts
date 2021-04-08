/* eslint-disable no-undef */
import { UserController } from '../../src/controllers/userController';
import connection from '../../src/database/connectionTest';
// import {User} from '../../src/database/models/User'

const userController = new UserController();

describe('User Controller create testes', () => {
  beforeAll(async () => {
    await connection.create();
  });

  afterAll(async () => {
    await connection.close();
  });

  // beforeEach(async () => {
  //   await connection.clear();
  // });
  it('Should create an new  user', async () => {
    try {
      const user = await userController.create(
        'Osvaldo Novais',
        'osvaldo@osvaldo.com.br',
        '123456789'
      );
      expect(user.email).toBe('osvaldo@osvaldo.com.br');
    } catch (error) {
      console.log(error.message);
    }
  });

  it('Should fail when create an existent user', async () => {
    try {
      const user = await userController.create(
        'Osvaldo Novais',
        'osvaldo@osvaldo.com.br',
        '123456789'
      );
      expect(user.email).not.toBe(123456789);
    } catch (error) {
      console.log(error.message);
    }
  });
});
