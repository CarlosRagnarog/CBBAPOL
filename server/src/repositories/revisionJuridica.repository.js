const pool = require('../config/db');

const getAll = async () => {
  const result = await pool.query(`
    SELECT 
      rj.*,
      CONCAT(p.primer_nombre, ' ', p.ap_paterno, ' ', p.ap_materno) AS personal_nombre,
      p.ci
    FROM revision_juridica rj
    LEFT JOIN personal p ON p.id = rj.personal_id
    ORDER BY rj.created_at DESC
  `);

  return result.rows;
};

const getById = async (id) => {
  const result = await pool.query(`
    SELECT 
      rj.*,
      CONCAT(p.primer_nombre, ' ', p.ap_paterno, ' ', p.ap_materno) AS personal_nombre,
      p.ci
    FROM revision_juridica rj
    LEFT JOIN personal p ON p.id = rj.personal_id
    WHERE rj.id = $1
  `, [id]);

  return result.rows[0];
};

const create = async (data) => {
  const result = await pool.query(`
    INSERT INTO revision_juridica (
      tipo,
      codigo,
      destino,
      origen,
      fecha,
      motivo,
      recepcion,
      fecha_hora,
      firma,
      entrega,
      personal_id
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
    RETURNING *
  `, [
    data.tipo,
    data.codigo,
    data.destino,
    data.origen,
    data.fecha,
    data.motivo,
    data.recepcion,
    data.fecha_hora,
    data.firma,
    data.entrega,
    data.personal_id
  ]);

  return result.rows[0];
};

const update = async (id, data) => {
  const result = await pool.query(`
    UPDATE revision_juridica
    SET tipo = $1,
        codigo = $2,
        destino = $3,
        origen = $4,
        fecha = $5,
        motivo = $6,
        recepcion = $7,
        fecha_hora = $8,
        firma = $9,
        entrega = $10,
        personal_id = $11
    WHERE id = $12
    RETURNING *
  `, [
    data.tipo,
    data.codigo,
    data.destino,
    data.origen,
    data.fecha,
    data.motivo,
    data.recepcion,
    data.fecha_hora,
    data.firma,
    data.entrega,
    data.personal_id,
    id
  ]);

  return result.rows[0];
};

const remove = async (id) => {
  const result = await pool.query(
    'DELETE FROM revision_juridica WHERE id = $1 RETURNING *',
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