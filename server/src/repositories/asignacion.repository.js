const pool = require('../config/db');

const getAll = async () => {
  const result = await pool.query(`
    SELECT 
      a.id,
      a.personal_id,
      a.institucion_id,
      a.cargo,
      a.unidad,
      a.desde,
      a.hasta,
      a.activo,
      a.created_at,
      CONCAT(p.primer_nombre, ' ', p.ap_paterno, ' ', p.ap_materno) AS personal_nombre,
      p.ci,
      i.nombre AS institucion_nombre,
      i.sigla AS institucion_sigla
    FROM asignaciones a
    INNER JOIN personal p ON p.id = a.personal_id
    INNER JOIN instituciones i ON i.id = a.institucion_id
    ORDER BY a.created_at DESC
  `);

  return result.rows;
};

const getById = async (id) => {
  const result = await pool.query(`
    SELECT 
      a.*,
      CONCAT(p.primer_nombre, ' ', p.ap_paterno, ' ', p.ap_materno) AS personal_nombre,
      p.ci,
      i.nombre AS institucion_nombre,
      i.sigla AS institucion_sigla
    FROM asignaciones a
    INNER JOIN personal p ON p.id = a.personal_id
    INNER JOIN instituciones i ON i.id = a.institucion_id
    WHERE a.id = $1
  `, [id]);

  return result.rows[0];
};

const getByPersonalId = async (personalId) => {
  const result = await pool.query(`
    SELECT 
      a.*,
      i.nombre AS institucion_nombre,
      i.sigla AS institucion_sigla
    FROM asignaciones a
    INNER JOIN instituciones i ON i.id = a.institucion_id
    WHERE a.personal_id = $1
    ORDER BY a.desde DESC
  `, [personalId]);

  return result.rows;
};

const create = async (data) => {
  const result = await pool.query(`
    INSERT INTO asignaciones (
      personal_id,
      institucion_id,
      cargo,
      unidad,
      desde,
      hasta,
      activo
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
  `, [
    data.personal_id,
    data.institucion_id,
    data.cargo,
    data.unidad,
    data.desde,
    data.hasta,
    data.activo ?? true
  ]);

  return result.rows[0];
};

const update = async (id, data) => {
  const result = await pool.query(`
    UPDATE asignaciones
    SET personal_id = $1,
        institucion_id = $2,
        cargo = $3,
        unidad = $4,
        desde = $5,
        hasta = $6,
        activo = $7
    WHERE id = $8
    RETURNING *
  `, [
    data.personal_id,
    data.institucion_id,
    data.cargo,
    data.unidad,
    data.desde,
    data.hasta,
    data.activo,
    id
  ]);

  return result.rows[0];
};

const remove = async (id) => {
  const result = await pool.query(`
    UPDATE asignaciones
    SET activo = false
    WHERE id = $1
    RETURNING *
  `, [id]);

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