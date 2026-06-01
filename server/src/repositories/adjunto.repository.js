const pool = require('../config/db');

const getAll = async () => {
  const result = await pool.query(`
    SELECT *
    FROM adjuntos
    ORDER BY created_at DESC
  `);

  return result.rows;
};

const getById = async (id) => {
  const result = await pool.query(
    'SELECT * FROM adjuntos WHERE id = $1',
    [id]
  );

  return result.rows[0];
};

const create = async (data) => {
  const result = await pool.query(`
    INSERT INTO adjuntos (
      filename,
      mime,
      size,
      url
    )
    VALUES ($1,$2,$3,$4)
    RETURNING *
  `, [
    data.filename,
    data.mime,
    data.size,
    data.url
  ]);

  return result.rows[0];
};

const remove = async (id) => {
  const result = await pool.query(
    'DELETE FROM adjuntos WHERE id = $1 RETURNING *',
    [id]
  );

  return result.rows[0];
};

module.exports = {
  getAll,
  getById,
  create,
  remove
};