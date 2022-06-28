const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const mockUser = {
  username: 'test@testing.net',
  password: 'javascriptisfornerds',
};

describe('user routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('post to /users should create a new user', async () => {
    const res = await request(app).post('/api/v1/users').send(mockUser);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: expect.any(Number),
      username: mockUser.username,
    });
  });
  afterAll(() => {
    pool.end();
  });
});
