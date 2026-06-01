const pool = require('../config/db');

const getAll = async () => {
  const result = await pool.query(`
    SELECT 
      d.*,
      CONCAT(p.primer_nombre, ' ', p.ap_paterno, ' ', p.ap_materno) AS personal_nombre,
      p.ci
    FROM destinos d
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
    FROM destinos d
    INNER JOIN personal p ON p.id = d.personal_id
    WHERE d.id = $1
  `, [id]);

  return result.rows[0];
};

const getByPersonalId = async (personalId) => {
  const result = await pool.query(`
    SELECT *
    FROM destinos
    WHERE personal_id = $1
    ORDER BY fecha_destino DESC
  `, [personalId]);

  return result.rows;
};

const create = async (data) => {
  const result = await pool.query(`
    INSERT INTO destinos (
      personal_id,
      unidad_anterior,
      unidad_actual,
      cargo_actual,
      memo_nro,
      fecha_destino,
      estado_personal,
      observaciones
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
    RETURNING *
  `, [
    data.personal_id,
    data.unidad_anterior,
    data.unidad_actual,
    data.cargo_actual,
    data.memo_nro,
    data.fecha_destino,
    data.estado_personal,
    data.observaciones
  ]);

  return result.rows[0];
};

const update = async (id, data) => {
  const result = await pool.query(`
    UPDATE destinos
    SET personal_id = $1,
        unidad_anterior = $2,
        unidad_actual = $3,
        cargo_actual = $4,
        memo_nro = $5,
        fecha_destino = $6,
        estado_personal = $7,
        observaciones = $8
    WHERE id = $9
    RETURNING *
  `, [
    data.personal_id,
    data.unidad_anterior,
    data.unidad_actual,
    data.cargo_actual,
    data.memo_nro,
    data.fecha_destino,
    data.estado_personal,
    data.observaciones,
    id
  ]);

  return result.rows[0];
};

const remove = async (id) => {
  const result = await pool.query(
    'DELETE FROM destinos WHERE id = $1 RETURNING *',
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