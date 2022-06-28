const pool = require('../utils/pool');

module.exports = class User {
  id;
  #passwordHash;
  email;
  constructor({ id, password_hash, email }) {
    this.id = id;
    this.#passwordHash = password_hash;
    this.email = email;
  }

  static async insert({ email, passwordHash }) {
    const { rows } = await pool.query(
      'INSERT INTO users (email, password_hash) VALUES ($1,$2) RETURNING *',
      [email, passwordHash]
    );
    return new User(rows[0]);
  }
};
