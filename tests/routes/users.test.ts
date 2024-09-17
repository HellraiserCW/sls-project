import request from 'supertest';
import express from 'express';
import router from '../../src/routes/users';
import { listUsers } from '../../src/controllers/list';
import { getUser } from '../../src/controllers/get';
import { getUserByEmail } from '../../src/controllers/get-by-email';
import { createUser } from '../../src/controllers/create';
import { updateUser } from '../../src/controllers/update';
import { deleteUser } from '../../src/controllers/delete';

jest.mock('../../src/controllers/list');
jest.mock('../../src/controllers/get');
jest.mock('../../src/controllers/get-by-email');
jest.mock('../../src/controllers/create');
jest.mock('../../src/controllers/update');
jest.mock('../../src/controllers/delete');

const app = express();
app.use(express.json());
app.use('/users', router);

describe('Users Routes', () => {
  it('should call listUsers on GET /users', async () => {
    await request(app).get('/users');

    expect(listUsers).toHaveBeenCalled();
  });

  it('should call getUser on GET /users/:id', async () => {
    await request(app).get('/users/1234-5678-91011');

    expect(getUser).toHaveBeenCalled();
  });

  it('should call getUserByEmail on GET /users/by-email/:email', async () => {
    await request(app).get('/users/by-email/john@example.com');

    expect(getUserByEmail).toHaveBeenCalled();
  });

  it('should call createUser on POST /users', async () => {
    await request(app).post('/users').send({ name: 'John Doe', email: 'john@example.com' });

    expect(createUser).toHaveBeenCalled();
  });

  it('should call updateUser on PUT /users/:id', async () => {
    await request(app).put('/users/1234-5678-91011').send({ name: 'John Doe', email: 'john@example.com' });

    expect(updateUser).toHaveBeenCalled();
  });

  it('should call deleteUser on DELETE /users/:id', async () => {
    await request(app).delete('/users/1234-5678-91011');

    expect(deleteUser).toHaveBeenCalled();
  });
});
