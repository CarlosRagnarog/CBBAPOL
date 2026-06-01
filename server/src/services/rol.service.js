const rolRepository = require('../repositories/rol.repository');

const getAllRoles = async () => {
  return await rolRepository.getAll();
};

const getRolById = async (id) => {
  const rol = await rolRepository.getById(id);

  if (!rol) {
    const error = new Error('Rol no encontrado');
    error.status = 404;
    throw error;
  }

  return rol;
};

const createRol = async (data) => {
  return await rolRepository.create(data);
};

const updateRol = async (id, data) => {
  const rol = await rolRepository.update(id, data);

  if (!rol) {
    const error = new Error('Rol no encontrado');
    error.status = 404;
    throw error;
  }

  return rol;
};

const deleteRol = async (id) => {
  const rol = await rolRepository.remove(id);

  if (!rol) {
    const error = new Error('Rol no encontrado');
    error.status = 404;
    throw error;
  }

  return rol;
};

const asignarRolUsuario = async (usuarioId, rolId) => {
  return await rolRepository.asignarRolUsuario(usuarioId, rolId);
};

const quitarRolUsuario = async (usuarioId, rolId) => {
  return await rolRepository.quitarRolUsuario(usuarioId, rolId);
};

const rolesPorUsuario = async (usuarioId) => {
  return await rolRepository.rolesPorUsuario(usuarioId);
};

module.exports = {
  getAllRoles,
  getRolById,
  createRol,
  updateRol,
  deleteRol,
  asignarRolUsuario,
  quitarRolUsuario,
  rolesPorUsuario
};