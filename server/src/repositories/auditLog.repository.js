const pool = require('../config/db');

const getAll = async () => {
  const result = await pool.query(`
    SELECT 
      al.*,
      u.username,
      u.email
    FROM audit_logs al
    LEFT JOIN usuarios u ON u.id = al.actor_id
    ORDER BY al.created_at DESC
  `);

  return result.rows;
};

const create = async (data) => {
  const result = await pool.query(`
    INSERT INTO audit_logs (
      actor_id,
      entidad,
      entidad_id,
      accion,
      payload
    )
    VALUES ($1,$2,$3,$4,$5)
    RETURNING *
  `, [
    data.actor_id,
    data.entidad,
    data.entidad_id,
    data.accion,
    data.payload
  ]);

  return result.rows[0];
};

module.exports = {
  getAll,
  create
};