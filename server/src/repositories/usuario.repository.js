const pool = require('../config/db');

const getAll = async () => {
  const result = await pool.query(`
    SELECT id, username, email, activo, created_at
    FROM usuarios
    ORDER BY created_at DESC
  `);

  return result.rows;
};

const getById = async (id) => {
  const result = await pool.query(`
    SELECT id, username, email, activo, created_at
    FROM usuarios
    WHERE id = $1
  `, [id]);

  return result.rows[0];
};

const findByEmail = async (email) => {
  const result = await pool.query(
    'SELECT * FROM usuarios WHERE email = $1',
    [email]
  );

  return result.rows[0];
};

const create = async (data) => {
  const result = await pool.query(`
    INSERT INTO usuarios (username, email, password_hash, activo)
    VALUES ($1, $2, $3, $4)
    RETURNING id, username, email, activo, created_at
  `, [
    data.username,
    data.email,
    data.password_hash,
    data.activo ?? true
  ]);

  return result.rows[0];
};

const update = async (id, data) => {
  const result = await pool.query(`
    UPDATE usuarios
    SET username = $1,
        email = $2,
        activo = $3
    WHERE id = $4
    RETURNING id, username, email, activo, created_at
  `, [
    data.username,
    data.email,
    data.activo,
    id
  ]);

  return result.rows[0];
};

const remove = async (id) => {
  const result = await pool.query(`
    UPDATE usuarios
    SET activo = false
    WHERE id = $1
    RETURNING id, username, email, activo, created_at
  `, [id]);

  return result.rows[0];
};

module.exports = {
  getAll,
  getById,
  findByEmail,
  create,
  update,
  remove
};