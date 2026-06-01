const pool = require('../config/db');

const findUserByEmail = async (email) => {
  const result = await pool.query(
    `SELECT id, username, email, password_hash, activo
     FROM usuarios
     WHERE email = $1`,
    [email]
  );

  return result.rows[0];
};

const findUserRoles = async (usuarioId) => {
  const result = await pool.query(
    `SELECT r.nombre
     FROM usuario_rol ur
     INNER JOIN roles r ON r.id = ur.rol_id
     WHERE ur.usuario_id = $1`,
    [usuarioId]
  );

  return result.rows.map(row => row.nombre);
};

module.exports = {
  findUserByEmail,
  findUserRoles
};