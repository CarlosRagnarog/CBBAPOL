const pool = require('../config/db');

const getAll = async () => {
  const result = await pool.query(`
    SELECT 
      la.*,
      CONCAT(p.primer_nombre, ' ', p.ap_paterno, ' ', p.ap_materno) AS personal_nombre,
      p.ci
    FROM llamadas_atencion la
    INNER JOIN personal p ON p.id = la.personal_id
    ORDER BY la.created_at DESC
  `);

  return result.rows;
};

const getById = async (id) => {
  const result = await pool.query(`
    SELECT 
      la.*,
      CONCAT(p.primer_nombre, ' ', p.ap_paterno, ' ', p.ap_materno) AS personal_nombre,
      p.ci
    FROM llamadas_atencion la
    INNER JOIN personal p ON p.id = la.personal_id
    WHERE la.id = $1
  `, [id]);

  return result.rows[0];
};

const getByPersonalId = async (personalId) => {
  const result = await pool.query(`
    SELECT *
    FROM llamadas_atencion
    WHERE personal_id = $1
    ORDER BY fecha_entrega DESC
  `, [personalId]);

  return result.rows;
};

const create = async (data) => {
  const result = await pool.query(`
    INSERT INTO llamadas_atencion (
      personal_id,
      nro,
      nro_folio,
      nro_memo,
      fecha_entrega,
      motivo,
      autoridad_firma
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7)
    RETURNING *
  `, [
    data.personal_id,
    data.nro,
    data.nro_folio,
    data.nro_memo,
    data.fecha_entrega,
    data.motivo,
    data.autoridad_firma
  ]);

  return result.rows[0];
};

const update = async (id, data) => {
  const result = await pool.query(`
    UPDATE llamadas_atencion
    SET personal_id = $1,
        nro = $2,
        nro_folio = $3,
        nro_memo = $4,
        fecha_entrega = $5,
        motivo = $6,
        autoridad_firma = $7
    WHERE id = $8
    RETURNING *
  `, [
    data.personal_id,
    data.nro,
    data.nro_folio,
    data.nro_memo,
    data.fecha_entrega,
    data.motivo,
    data.autoridad_firma,
    id
  ]);

  return result.rows[0];
};

const remove = async (id) => {
  const result = await pool.query(
    'DELETE FROM llamadas_atencion WHERE id = $1 RETURNING *',
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