/* eslint-disable no-undef */

import * as request from 'supertest';
import { app } from '../../src/app';
import connection from '../../src/database/connectionTest';
// import { EventController } from '../../src/controllers/eventController';

describe('create Controller', () => {
  beforeAll(async () => {
    await connection.create();
    await connection.clear();
  });

  afterAll(async () => {
    await connection.close();
  });

  // beforeEach(async () => {
  //   await connection.clear();
  // });

  it('Should create a new event with valid', async () => {
    const response = await request(app)
      .post('/api/events')
      .send({
        description: 'Teste2',
        initTime: new Date('09/04/2021 13:30:00'),
        finishTime: new Date('09/04/2021 13:30:00'),
      })
      .then((res) => res.status);
    expect(response).toBe(201);
  });
});
