const pool = require('../config/db');

const getAll = async () => {
  const result = await pool.query(`
    SELECT 
      s.*,
      CONCAT(p.primer_nombre, ' ', p.ap_paterno, ' ', p.ap_materno) AS personal_nombre,
      p.ci
    FROM situaciones s
    INNER JOIN personal p ON p.id = s.personal_id
    ORDER BY s.created_at DESC
  `);

  return result.rows;
};

const getById = async (id) => {
  const result = await pool.query(`
    SELECT 
      s.*,
      CONCAT(p.primer_nombre, ' ', p.ap_paterno, ' ', p.ap_materno) AS personal_nombre,
      p.ci
    FROM situaciones s
    INNER JOIN personal p ON p.id = s.personal_id
    WHERE s.id = $1
  `, [id]);

  return result.rows[0];
};

const getByPersonalId = async (personalId) => {
  const result = await pool.query(`
    SELECT *
    FROM situaciones
    WHERE personal_id = $1
    ORDER BY fecha_inicio DESC
  `, [personalId]);

  return result.rows;
};

const create = async (data) => {
  const result = await pool.query(`
    INSERT INTO situaciones (
      personal_id,
      tipo,
      causal,
      fecha_inicio,
      fecha_retorno,
      situacion_actual,
      observaciones
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7)
    RETURNING *
  `, [
    data.personal_id,
    data.tipo,
    data.causal,
    data.fecha_inicio,
    data.fecha_retorno,
    data.situacion_actual,
    data.observaciones
  ]);

  return result.rows[0];
};

const update = async (id, data) => {
  const result = await pool.query(`
    UPDATE situaciones
    SET personal_id = $1,
        tipo = $2,
        causal = $3,
        fecha_inicio = $4,
        fecha_retorno = $5,
        situacion_actual = $6,
        observaciones = $7
    WHERE id = $8
    RETURNING *
  `, [
    data.personal_id,
    data.tipo,
    data.causal,
    data.fecha_inicio,
    data.fecha_retorno,
    data.situacion_actual,
    data.observaciones,
    id
  ]);

  return result.rows[0];
};

const remove = async (id) => {
  const result = await pool.query(
    'DELETE FROM situaciones WHERE id = $1 RETURNING *',
    [id]
  );

  return result.rows[0];
};

module.exports = {
  getAll,
  getById,
  getByPersonalId,
  create,
  update,
  remove
};