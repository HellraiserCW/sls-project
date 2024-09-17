import request from 'supertest';
import express from 'express';
import { getUser } from '../../src/controllers/get';
import { dynamodb } from '../../src/dynamodb';

jest.mock('../../src/dynamodb');

const app = express();
app.use(express.json());
app.get('/user/:id', getUser);

describe('GET /user/:id', () => {
  it('should retrieve a user successfully', async () => {
    const mockUser = { id: '1234-5678-91011', name: 'John Doe' };
    (dynamodb.get as jest.Mock).mockImplementation((_params, callback) => {
      callback(null, { Item: mockUser });
    });

    const res = await request(app).get('/user/1234-5678-91011');

    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockUser);
  });

  it('should return 500 if there is a database error', async () => {
    (dynamodb.get as jest.Mock).mockImplementation((_params, callback) => {
      callback(new Error('DB Error'), null);
    });

    const res = await request(app).get('/user/1234-5678-91011');

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: 'Failed to retrieve user from db' });
  });
});
