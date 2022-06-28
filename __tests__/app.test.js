const pool = require('../lib/utils/pool');
const setup = require('../data/setup');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it.skip('example test - delete me!', () => {
    expect(1).toEqual(1);
  });
  afterAll(() => {
    pool.end();
  });
});
