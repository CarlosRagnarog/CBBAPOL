const pool = require('../config/db');

const getAll = async () => {
  const result = await pool.query(`
    SELECT ar.*, a.tipo, a.codigo, a.nombre
    FROM archivos_rel ar
    INNER JOIN archivos a ON a.id = ar.archivo_id
    ORDER BY ar.created_at DESC
  `);

  return result.rows;
};

const getByEntity = async (entityType, entityId) => {
  const result = await pool.query(`
    SELECT ar.*, a.tipo, a.codigo, a.nombre, a.fecha
    FROM archivos_rel ar
    INNER JOIN archivos a ON a.id = ar.archivo_id
    WHERE ar.entity_type = $1 AND ar.entity_id = $2
    ORDER BY ar.created_at DESC
  `, [entityType, entityId]);

  return result.rows;
};

const create = async (data) => {
  const result = await pool.query(`
    INSERT INTO archivos_rel (
      entity_type,
      entity_id,
      archivo_id
    )
    VALUES ($1,$2,$3)
    RETURNING *
  `, [
    data.entity_type,
    data.entity_id,
    data.archivo_id
  ]);

  return result.rows[0];
};

const remove = async (id) => {
  const result = await pool.query(
    'DELETE FROM archivos_rel WHERE id = $1 RETURNING *',
    [id]
  );

  return result.rows[0];
};

module.exports = {
  getAll,
  getByEntity,
  create,
  remove
};