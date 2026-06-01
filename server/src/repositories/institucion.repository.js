const pool = require('../config/db');

const getAll = async () => {
  const result = await pool.query(
    'SELECT * FROM instituciones WHERE activo = true ORDER BY nombre ASC'
  );
  return result.rows;
};

const getById = async (id) => {
  const result = await pool.query(
    'SELECT * FROM instituciones WHERE id = $1 AND activo = true',
    [id]
  );
  return result.rows[0];
};

const create = async (data) => {
  const result = await pool.query(
    `INSERT INTO instituciones (nombre, sigla, tipo)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [data.nombre, data.sigla, data.tipo]
  );
  return result.rows[0];
};

const update = async (id, data) => {
  const result = await pool.query(
    `UPDATE instituciones
     SET nombre = $1, sigla = $2, tipo = $3
     WHERE id = $4 AND activo = true
     RETURNING *`,
    [data.nombre, data.sigla, data.tipo, id]
  );
  return result.rows[0];
};

const remove = async (id) => {
  const result = await pool.query(
    `UPDATE instituciones
     SET activo = false
     WHERE id = $1 AND activo = true
     RETURNING *`,
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