const pool = require('../config/db');

const getAll = async () => {
  const result = await pool.query(
    'SELECT * FROM grados ORDER BY orden ASC'
  );
  return result.rows;
};

const getById = async (id) => {
  const result = await pool.query(
    'SELECT * FROM grados WHERE id = $1',
    [id]
  );
  return result.rows[0];
};

const create = async (data) => {
  const result = await pool.query(
    `INSERT INTO grados (id, nombre, orden)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [data.id, data.nombre, data.orden]
  );
  return result.rows[0];
};

const update = async (id, data) => {
  const result = await pool.query(
    `UPDATE grados
     SET nombre = $1, orden = $2
     WHERE id = $3
     RETURNING *`,
    [data.nombre, data.orden, id]
  );
  return result.rows[0];
};

const remove = async (id) => {
  const result = await pool.query(
    'DELETE FROM grados WHERE id = $1 RETURNING *',
    [id]
  );
  return result.rows[0];
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};