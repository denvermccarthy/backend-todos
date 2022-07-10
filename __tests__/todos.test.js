const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const mockUser = {
  email: 'test@testing.net',
  password: 'password',
};

const registerAndLogin = async () => {
  const agent = request.agent(app);
  const user = agent.post('/api/v1/users').send(mockUser);

  await agent
    .post('/api/v1/users/sessions')
    .send({ email: mockUser.password, password: mockUser.password });
  return [agent, user];
};

describe('user routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  test('GET to /todos should list all todos for the authed user.', async () => {
    const [agent] = await registerAndLogin();
    const res = await agent.get('/api/v1/todos');
    expect(res.body.length > 0).toEqual(true);
    expect(res.body[0]).toEqual({
      id: expect.any(String),
      userId: expect.any(Number),
      todo: expect.any(String),
      done: expect.any(Boolean),
    });
  });

  afterAll(() => {
    pool.end();
  });
});
