const asignacionRepository = require('../repositories/asignacion.repository');

const getAllAsignaciones = async () => {
  return await asignacionRepository.getAll();
};

const getAsignacionById = async (id) => {
  const asignacion = await asignacionRepository.getById(id);

  if (!asignacion) {
    const error = new Error('Asignación no encontrada');
    error.status = 404;
    throw error;
  }

  return asignacion;
};

const getAsignacionesByPersonalId = async (personalId) => {
  return await asignacionRepository.getByPersonalId(personalId);
};

const createAsignacion = async (data) => {
  return await asignacionRepository.create(data);
};

const updateAsignacion = async (id, data) => {
  const asignacion = await asignacionRepository.update(id, data);

  if (!asignacion) {
    const error = new Error('Asignación no encontrada');
    error.status = 404;
    throw error;
  }

  return asignacion;
};

const deleteAsignacion = async (id) => {
  const asignacion = await asignacionRepository.remove(id);

  if (!asignacion) {
    const error = new Error('Asignación no encontrada');
    error.status = 404;
    throw error;
  }

  return asignacion;
};

module.exports = {
  getAllAsignaciones,
  getAsignacionById,
  getAsignacionesByPersonalId,
  createAsignacion,
  updateAsignacion,
  deleteAsignacion
};