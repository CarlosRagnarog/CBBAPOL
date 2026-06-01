const pool = require('../config/db');

const getAll = async () => {
  const result = await pool.query(`
    SELECT 
      d.*,
      CONCAT(p.primer_nombre, ' ', p.ap_paterno, ' ', p.ap_materno) AS personal_nombre,
      p.ci
    FROM designaciones d
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
    FROM designaciones d
    INNER JOIN personal p ON p.id = d.personal_id
    WHERE d.id = $1
  `, [id]);

  return result.rows[0];
};

const getByPersonalId = async (personalId) => {
  const result = await pool.query(`
    SELECT *
    FROM designaciones
    WHERE personal_id = $1
    ORDER BY fecha_entrega DESC
  `, [personalId]);

  return result.rows;
};

const create = async (data) => {
  const result = await pool.query(`
    INSERT INTO designaciones (
      personal_id,
      nro,
      nro_folio,
      nro_memo,
      fecha_entrega,
      designacion,
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
    data.designacion,
    data.autoridad_firma
  ]);

  return result.rows[0];
};

const update = async (id, data) => {
  const result = await pool.query(`
    UPDATE designaciones
    SET personal_id = $1,
        nro = $2,
        nro_folio = $3,
        nro_memo = $4,
        fecha_entrega = $5,
        designacion = $6,
        autoridad_firma = $7
    WHERE id = $8
    RETURNING *
  `, [
    data.personal_id,
    data.nro,
    data.nro_folio,
    data.nro_memo,
    data.fecha_entrega,
    data.designacion,
    data.autoridad_firma,
    id
  ]);

  return result.rows[0];
};

const remove = async (id) => {
  const result = await pool.query(
    'DELETE FROM designaciones WHERE id = $1 RETURNING *',
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