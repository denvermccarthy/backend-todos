const pool = require('../utils/pool');

module.exports = class Todo {
  id;
  todo;
  done;
  userId;
  constructor({ id, todo, done, user_id }) {
    this.id = id;
    this.todo = todo;
    this.done = done;
    this.userId = user_id;
  }

  static async insertTodo({ todo, userId }) {
    const { rows } = await pool.query(
      'INSERT into todos (todo, user_id) VALUES ($1, $2) RETURNING *',
      [todo, userId]
    );
    return new Todo(rows[0]);
  }
};
