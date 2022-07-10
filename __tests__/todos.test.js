const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const mockUser = {
  email: 'test@testing.net',
  password: 'password',
};
const todos = [
  { todo: 'Take the trash out' },
  { todo: 'Clean my room' },
  { todo: 'Finish this assignment' },
];

const registerAndLogin = async () => {
  const agent = request.agent(app);
  const user = await agent.post('/api/v1/users').send(mockUser);

  await agent.post('/api/v1/users/session').send(mockUser);
  return [agent, user.body];
};
const createDummyData = async () => {
  const [agent, user] = await registerAndLogin();
  const promises = todos.map((todo) => agent.post('/api/v1/todos').send(todo));
  await Promise.all(promises);
  return [agent, user];
};

describe('user routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  test('GET to /todos should list all todos for the authed user.', async () => {
    const [agent] = await createDummyData();
    const res = await agent.get('/api/v1/todos');
    expect(res.body.length > 0).toEqual(true);
    expect(res.body[0]).toEqual({
      id: expect.any(String),
      userId: expect.any(String),
      todo: expect.any(String),
      done: expect.any(Boolean),
    });
  });
  test('POST to /todos should post a todo', async () => {
    const [agent, user] = await registerAndLogin();
    const todo = {
      todo: 'Clean my room',
    };
    const res = await agent.post('/api/v1/todos').send(todo);
    expect(res.body).toEqual({
      id: expect.any(String),
      userId: user.id,
      todo: todo.todo,
      done: false,
    });
  });
  afterAll(() => {
    pool.end();
  });
});
