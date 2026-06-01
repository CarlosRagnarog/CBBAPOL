const pool = require('../config/db');

const getAll = async () => {
  const result = await pool.query(`
    SELECT *
    FROM archivos
    ORDER BY created_at DESC
  `);

  return result.rows;
};

const getById = async (id) => {
  const result = await pool.query(
    'SELECT * FROM archivos WHERE id = $1',
    [id]
  );

  return result.rows[0];
};

const create = async (data) => {
  const result = await pool.query(`
    INSERT INTO archivos (
      tipo,
      codigo,
      fecha,
      nombre,
      inicio,
      fin
    )
    VALUES ($1,$2,$3,$4,$5,$6)
    RETURNING *
  `, [
    data.tipo,
    data.codigo,
    data.fecha,
    data.nombre,
    data.inicio,
    data.fin
  ]);

  return result.rows[0];
};

const update = async (id, data) => {
  const result = await pool.query(`
    UPDATE archivos
    SET tipo = $1,
        codigo = $2,
        fecha = $3,
        nombre = $4,
        inicio = $5,
        fin = $6
    WHERE id = $7
    RETURNING *
  `, [
    data.tipo,
    data.codigo,
    data.fecha,
    data.nombre,
    data.inicio,
    data.fin,
    id
  ]);

  return result.rows[0];
};

const remove = async (id) => {
  const result = await pool.query(
    'DELETE FROM archivos WHERE id = $1 RETURNING *',
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