/* eslint-disable no-undef */
import * as request from 'supertest';
import { app } from '../../src/app';

describe('Get Route', () => {
  it('Should return response 200', async () => {
    const status = await request(app)
      .get('/api/events')
      .then((res) => res.status);
    expect(status).toBe(200);
  });
});
