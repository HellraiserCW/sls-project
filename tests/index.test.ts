import request from 'supertest';
import express from 'express';

const app = express();
app.use(express.json());
app.get('/', (_req, res) => {
  res.send('Hello, Lambda!');
});

describe('GET /', () => {
  it('should return Hello, Lambda!', async () => {
    const res = await request(app).get('/');

    expect(res.statusCode).toEqual(200);
    expect(res.text).toBe('Hello, Lambda!');
  });
});