const pool = require('../config/db');

const getAll = async () => {
  const result = await pool.query(`
    SELECT 
      c.*,
      CONCAT(p.primer_nombre, ' ', p.ap_paterno, ' ', p.ap_materno) AS personal_nombre,
      p.ci
    FROM correspondencia c
    LEFT JOIN personal p ON p.id = c.personal_id
    ORDER BY c.created_at DESC
  `);

  return result.rows;
};

const getById = async (id) => {
  const result = await pool.query(`
    SELECT 
      c.*,
      CONCAT(p.primer_nombre, ' ', p.ap_paterno, ' ', p.ap_materno) AS personal_nombre,
      p.ci
    FROM correspondencia c
    LEFT JOIN personal p ON p.id = c.personal_id
    WHERE c.id = $1
  `, [id]);

  return result.rows[0];
};

const create = async (data) => {
  const result = await pool.query(`
    INSERT INTO correspondencia (
      tipo,
      codigo_registro,
      origen,
      nro_oficio,
      referencia,
      remitente,
      seccion,
      fecha_hora,
      firma,
      tiempo_respuesta,
      personal_id
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
    RETURNING *
  `, [
    data.tipo,
    data.codigo_registro,
    data.origen,
    data.nro_oficio,
    data.referencia,
    data.remitente,
    data.seccion,
    data.fecha_hora,
    data.firma,
    data.tiempo_respuesta,
    data.personal_id
  ]);

  return result.rows[0];
};

const update = async (id, data) => {
  const result = await pool.query(`
    UPDATE correspondencia
    SET tipo = $1,
        codigo_registro = $2,
        origen = $3,
        nro_oficio = $4,
        referencia = $5,
        remitente = $6,
        seccion = $7,
        fecha_hora = $8,
        firma = $9,
        tiempo_respuesta = $10,
        personal_id = $11
    WHERE id = $12
    RETURNING *
  `, [
    data.tipo,
    data.codigo_registro,
    data.origen,
    data.nro_oficio,
    data.referencia,
    data.remitente,
    data.seccion,
    data.fecha_hora,
    data.firma,
    data.tiempo_respuesta,
    data.personal_id,
    id
  ]);

  return result.rows[0];
};

const remove = async (id) => {
  const result = await pool.query(
    'DELETE FROM correspondencia WHERE id = $1 RETURNING *',
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