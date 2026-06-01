const pool = require('../config/db');

const getAll = async () => {
  const result = await pool.query(`
    SELECT 
      v.*,
      CONCAT(p.primer_nombre, ' ', p.ap_paterno, ' ', p.ap_materno) AS personal_nombre,
      p.ci
    FROM vacaciones v
    INNER JOIN personal p ON p.id = v.personal_id
    ORDER BY v.created_at DESC
  `);

  return result.rows;
};

const getById = async (id) => {
  const result = await pool.query(`
    SELECT 
      v.*,
      CONCAT(p.primer_nombre, ' ', p.ap_paterno, ' ', p.ap_materno) AS personal_nombre,
      p.ci
    FROM vacaciones v
    INNER JOIN personal p ON p.id = v.personal_id
    WHERE v.id = $1
  `, [id]);

  return result.rows[0];
};

const getByPersonalId = async (personalId) => {
  const result = await pool.query(`
    SELECT *
    FROM vacaciones
    WHERE personal_id = $1
    ORDER BY desde DESC
  `, [personalId]);

  return result.rows;
};

const create = async (data) => {
  const result = await pool.query(`
    INSERT INTO vacaciones (
      personal_id,
      nro,
      nro_memo,
      desde,
      hasta,
      dias,
      observaciones,
      autoridad_firma
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
    RETURNING *
  `, [
    data.personal_id,
    data.nro,
    data.nro_memo,
    data.desde,
    data.hasta,
    data.dias,
    data.observaciones,
    data.autoridad_firma
  ]);

  return result.rows[0];
};

const update = async (id, data) => {
  const result = await pool.query(`
    UPDATE vacaciones
    SET personal_id = $1,
        nro = $2,
        nro_memo = $3,
        desde = $4,
        hasta = $5,
        dias = $6,
        observaciones = $7,
        autoridad_firma = $8
    WHERE id = $9
    RETURNING *
  `, [
    data.personal_id,
    data.nro,
    data.nro_memo,
    data.desde,
    data.hasta,
    data.dias,
    data.observaciones,
    data.autoridad_firma,
    id
  ]);

  return result.rows[0];
};

const remove = async (id) => {
  const result = await pool.query(
    'DELETE FROM vacaciones WHERE id = $1 RETURNING *',
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