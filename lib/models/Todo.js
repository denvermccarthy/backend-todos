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

  static async getAll({ id }) {
    const { rows } = await pool.query('SELECT * from todos WHERE user_id=$1', [
      id,
    ]);
    return rows.map((row) => new Todo(row));
  }

  static async getById({ id, userId }) {
    const { rows } = await pool.query(
      'SELECT * from todos WHERE id=$1 AND user_id=$2',
      [id, userId]
    );
    return rows[0] ? new Todo(rows[0]) : null;
  }

  static async updateById(id, attrs, userId) {
    const correctTodo = await this.getById({ id, userId });
    const { todo, done } = { ...correctTodo, ...attrs };
    const { rows } = await pool.query(
      'UPDATE todos SET todo=$2, done=$3 WHERE id=$1 RETURNING *',
      [id, todo, done]
    );
    return new Todo(rows[0]);
  }
};
