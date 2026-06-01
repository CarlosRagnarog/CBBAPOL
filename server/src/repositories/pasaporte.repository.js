const pool = require('../config/db');

const getAll = async () => {
  const result = await pool.query(`
    SELECT 
      pa.*,
      CONCAT(p.primer_nombre, ' ', p.ap_paterno, ' ', p.ap_materno) AS personal_nombre,
      p.ci
    FROM pasaportes pa
    INNER JOIN personal p ON p.id = pa.personal_id
    ORDER BY pa.created_at DESC
  `);

  return result.rows;
};

const getById = async (id) => {
  const result = await pool.query(`
    SELECT 
      pa.*,
      CONCAT(p.primer_nombre, ' ', p.ap_paterno, ' ', p.ap_materno) AS personal_nombre,
      p.ci
    FROM pasaportes pa
    INNER JOIN personal p ON p.id = pa.personal_id
    WHERE pa.id = $1
  `, [id]);

  return result.rows[0];
};

const getByPersonalId = async (personalId) => {
  const result = await pool.query(`
    SELECT *
    FROM pasaportes
    WHERE personal_id = $1
    ORDER BY fecha_salida DESC
  `, [personalId]);

  return result.rows;
};

const create = async (data) => {
  const result = await pool.query(`
    INSERT INTO pasaportes (
      personal_id,
      nro_folio,
      nro_pasaporte,
      dias,
      fecha_salida,
      fecha_llegada,
      destino,
      motivo
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
    RETURNING *
  `, [
    data.personal_id,
    data.nro_folio,
    data.nro_pasaporte,
    data.dias,
    data.fecha_salida,
    data.fecha_llegada,
    data.destino,
    data.motivo
  ]);

  return result.rows[0];
};

const update = async (id, data) => {
  const result = await pool.query(`
    UPDATE pasaportes
    SET personal_id = $1,
        nro_folio = $2,
        nro_pasaporte = $3,
        dias = $4,
        fecha_salida = $5,
        fecha_llegada = $6,
        destino = $7,
        motivo = $8
    WHERE id = $9
    RETURNING *
  `, [
    data.personal_id,
    data.nro_folio,
    data.nro_pasaporte,
    data.dias,
    data.fecha_salida,
    data.fecha_llegada,
    data.destino,
    data.motivo,
    id
  ]);

  return result.rows[0];
};

const remove = async (id) => {
  const result = await pool.query(
    'DELETE FROM pasaportes WHERE id = $1 RETURNING *',
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