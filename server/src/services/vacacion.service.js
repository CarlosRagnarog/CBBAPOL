const vacacionRepository = require('../repositories/vacacion.repository');

const getAllVacaciones = async () => {
  return await vacacionRepository.getAll();
};

const getVacacionById = async (id) => {
  const vacacion = await vacacionRepository.getById(id);

  if (!vacacion) {
    const error = new Error('Vacación no encontrada');
    error.status = 404;
    throw error;
  }

  return vacacion;
};

const getVacacionesByPersonalId = async (personalId) => {
  return await vacacionRepository.getByPersonalId(personalId);
};

const createVacacion = async (data) => {
  return await vacacionRepository.create(data);
};

const updateVacacion = async (id, data) => {
  const vacacion = await vacacionRepository.update(id, data);

  if (!vacacion) {
    const error = new Error('Vacación no encontrada');
    error.status = 404;
    throw error;
  }

  return vacacion;
};

const deleteVacacion = async (id) => {
  const vacacion = await vacacionRepository.remove(id);

  if (!vacacion) {
    const error = new Error('Vacación no encontrada');
    error.status = 404;
    throw error;
  }

  return vacacion;
};

module.exports = {
  getAllVacaciones,
  getVacacionById,
  getVacacionesByPersonalId,
  createVacacion,
  updateVacacion,
  deleteVacacion
};