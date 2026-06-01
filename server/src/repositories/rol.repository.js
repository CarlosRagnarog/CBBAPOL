const pool = require('../config/db');

const getAll = async () => {
  const result = await pool.query(`
    SELECT id, nombre, descripcion
    FROM roles
    ORDER BY nombre ASC
  `);

  return result.rows;
};

const getById = async (id) => {
  const result = await pool.query(`
    SELECT id, nombre, descripcion
    FROM roles
    WHERE id = $1
  `, [id]);

  return result.rows[0];
};

const create = async (data) => {
  const result = await pool.query(`
    INSERT INTO roles (nombre, descripcion)
    VALUES ($1, $2)
    RETURNING *
  `, [data.nombre, data.descripcion]);

  return result.rows[0];
};

const update = async (id, data) => {
  const result = await pool.query(`
    UPDATE roles
    SET nombre = $1,
        descripcion = $2
    WHERE id = $3
    RETURNING *
  `, [data.nombre, data.descripcion, id]);

  return result.rows[0];
};

const remove = async (id) => {
  const result = await pool.query(`
    DELETE FROM roles
    WHERE id = $1
    RETURNING *
  `, [id]);

  return result.rows[0];
};

const asignarRolUsuario = async (usuarioId, rolId) => {
  const result = await pool.query(`
    INSERT INTO usuario_rol (usuario_id, rol_id)
    VALUES ($1, $2)
    ON CONFLICT DO NOTHING
    RETURNING *
  `, [usuarioId, rolId]);

  return result.rows[0];
};

const quitarRolUsuario = async (usuarioId, rolId) => {
  const result = await pool.query(`
    DELETE FROM usuario_rol
    WHERE usuario_id = $1 AND rol_id = $2
    RETURNING *
  `, [usuarioId, rolId]);

  return result.rows[0];
};

const rolesPorUsuario = async (usuarioId) => {
  const result = await pool.query(`
    SELECT r.id, r.nombre, r.descripcion
    FROM usuario_rol ur
    INNER JOIN roles r ON r.id = ur.rol_id
    WHERE ur.usuario_id = $1
    ORDER BY r.nombre ASC
  `, [usuarioId]);

  return result.rows;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  asignarRolUsuario,
  quitarRolUsuario,
  rolesPorUsuario
};