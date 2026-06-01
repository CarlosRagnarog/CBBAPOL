const situacionRepository = require('../repositories/situacion.repository');

const getAllSituaciones = async () => {
  return await situacionRepository.getAll();
};

const getSituacionById = async (id) => {
  const situacion = await situacionRepository.getById(id);

  if (!situacion) {
    const error = new Error('Situación no encontrada');
    error.status = 404;
    throw error;
  }

  return situacion;
};

const getSituacionesByPersonalId = async (personalId) => {
  return await situacionRepository.getByPersonalId(personalId);
};

const createSituacion = async (data) => {
  return await situacionRepository.create(data);
};

const updateSituacion = async (id, data) => {
  const situacion = await situacionRepository.update(id, data);

  if (!situacion) {
    const error = new Error('Situación no encontrada');
    error.status = 404;
    throw error;
  }

  return situacion;
};

const deleteSituacion = async (id) => {
  const situacion = await situacionRepository.remove(id);

  if (!situacion) {
    const error = new Error('Situación no encontrada');
    error.status = 404;
    throw error;
  }

  return situacion;
};

module.exports = {
  getAllSituaciones,
  getSituacionById,
  getSituacionesByPersonalId,
  createSituacion,
  updateSituacion,
  deleteSituacion
};