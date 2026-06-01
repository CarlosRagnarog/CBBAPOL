const felicitacionRepository = require('../repositories/felicitacion.repository');

const getAllFelicitaciones = async () => {
  return await felicitacionRepository.getAll();
};

const getFelicitacionById = async (id) => {
  const item = await felicitacionRepository.getById(id);

  if (!item) {
    const error = new Error('Felicitación no encontrada');
    error.status = 404;
    throw error;
  }

  return item;
};

const getFelicitacionesByPersonalId = async (personalId) => {
  return await felicitacionRepository.getByPersonalId(personalId);
};

const createFelicitacion = async (data) => {
  return await felicitacionRepository.create(data);
};

const updateFelicitacion = async (id, data) => {
  const item = await felicitacionRepository.update(id, data);

  if (!item) {
    const error = new Error('Felicitación no encontrada');
    error.status = 404;
    throw error;
  }

  return item;
};

const deleteFelicitacion = async (id) => {
  const item = await felicitacionRepository.remove(id);

  if (!item) {
    const error = new Error('Felicitación no encontrada');
    error.status = 404;
    throw error;
  }

  return item;
};

module.exports = {
  getAllFelicitaciones,
  getFelicitacionById,
  getFelicitacionesByPersonalId,
  createFelicitacion,
  updateFelicitacion,
  deleteFelicitacion
};