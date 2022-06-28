const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const mockUser = {
  email: 'test@testing.net',
  password: 'password',
};

describe('user routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('post to /users should create a new user', async () => {
    const res = await request(app).post('/api/v1/users').send(mockUser);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      email: mockUser.email,
    });
  });
  it('post to /users/session should sign a user in', async () => {
    const agent = await request.agent(app);
    await agent.post('/api/v1/users').send(mockUser);
    const res = await agent.post('/api/v1/users/session').send(mockUser);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      message: 'Successfully signed in',
    });
  });
  it('delete to /session deletes the user session', async () => {
    const agent = await request.agent(app);
    await agent.post('/api/v1/users').send(mockUser);
    await agent.post('/api/v1/users/session').send(mockUser);
    const resp = await agent.delete('/api/v1/users/session');
    expect(resp.status).toBe(200);
  });
  afterAll(() => {
    pool.end();
  });
});
