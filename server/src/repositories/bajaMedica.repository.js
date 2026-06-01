const pool = require('../config/db');

const getAll = async () => {
  const result = await pool.query(`
    SELECT 
      bm.*,
      CONCAT(p.primer_nombre, ' ', p.ap_paterno, ' ', p.ap_materno) AS personal_nombre,
      p.ci
    FROM bajas_medicas bm
    INNER JOIN personal p ON p.id = bm.personal_id
    ORDER BY bm.created_at DESC
  `);

  return result.rows;
};

const getById = async (id) => {
  const result = await pool.query(`
    SELECT 
      bm.*,
      CONCAT(p.primer_nombre, ' ', p.ap_paterno, ' ', p.ap_materno) AS personal_nombre,
      p.ci
    FROM bajas_medicas bm
    INNER JOIN personal p ON p.id = bm.personal_id
    WHERE bm.id = $1
  `, [id]);

  return result.rows[0];
};

const getByPersonalId = async (personalId) => {
  const result = await pool.query(`
    SELECT *
    FROM bajas_medicas
    WHERE personal_id = $1
    ORDER BY desde DESC
  `, [personalId]);

  return result.rows;
};

const create = async (data) => {
  const result = await pool.query(`
    INSERT INTO bajas_medicas (
      personal_id,
      nro,
      nro_folio,
      desde,
      hasta,
      institucion_medica,
      observaciones
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7)
    RETURNING *
  `, [
    data.personal_id,
    data.nro,
    data.nro_folio,
    data.desde,
    data.hasta,
    data.institucion_medica,
    data.observaciones
  ]);

  return result.rows[0];
};

const update = async (id, data) => {
  const result = await pool.query(`
    UPDATE bajas_medicas
    SET personal_id = $1,
        nro = $2,
        nro_folio = $3,
        desde = $4,
        hasta = $5,
        institucion_medica = $6,
        observaciones = $7
    WHERE id = $8
    RETURNING *
  `, [
    data.personal_id,
    data.nro,
    data.nro_folio,
    data.desde,
    data.hasta,
    data.institucion_medica,
    data.observaciones,
    id
  ]);

  return result.rows[0];
};

const remove = async (id) => {
  const result = await pool.query(
    'DELETE FROM bajas_medicas WHERE id = $1 RETURNING *',
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