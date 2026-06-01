const pool = require('../config/db');

const getAll = async () => {
  const result = await pool.query(`
    SELECT 
      d.*,
      CONCAT(p.primer_nombre, ' ', p.ap_paterno, ' ', p.ap_materno) AS personal_nombre,
      p.ci
    FROM disciplinario d
    INNER JOIN personal p ON p.id = d.personal_id
    ORDER BY d.created_at DESC
  `);

  return result.rows;
};

const getById = async (id) => {
  const result = await pool.query(`
    SELECT 
      d.*,
      CONCAT(p.primer_nombre, ' ', p.ap_paterno, ' ', p.ap_materno) AS personal_nombre,
      p.ci
    FROM disciplinario d
    INNER JOIN personal p ON p.id = d.personal_id
    WHERE d.id = $1
  `, [id]);

  return result.rows[0];
};

const getByPersonalId = async (personalId) => {
  const result = await pool.query(`
    SELECT *
    FROM disciplinario
    WHERE personal_id = $1
    ORDER BY fecha DESC
  `, [personalId]);

  return result.rows;
};

const create = async (data) => {
  const result = await pool.query(`
    INSERT INTO disciplinario (
      personal_id,
      nro,
      nro_folio,
      nro_memo,
      fecha,
      causal,
      observaciones,
      autoridad_firma
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
    RETURNING *
  `, [
    data.personal_id,
    data.nro,
    data.nro_folio,
    data.nro_memo,
    data.fecha,
    data.causal,
    data.observaciones,
    data.autoridad_firma
  ]);

  return result.rows[0];
};

const update = async (id, data) => {
  const result = await pool.query(`
    UPDATE disciplinario
    SET personal_id = $1,
        nro = $2,
        nro_folio = $3,
        nro_memo = $4,
        fecha = $5,
        causal = $6,
        observaciones = $7,
        autoridad_firma = $8
    WHERE id = $9
    RETURNING *
  `, [
    data.personal_id,
    data.nro,
    data.nro_folio,
    data.nro_memo,
    data.fecha,
    data.causal,
    data.observaciones,
    data.autoridad_firma,
    id
  ]);

  return result.rows[0];
};

const remove = async (id) => {
  const result = await pool.query(
    'DELETE FROM disciplinario WHERE id = $1 RETURNING *',
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