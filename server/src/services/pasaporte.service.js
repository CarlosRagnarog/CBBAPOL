const pasaporteRepository = require('../repositories/pasaporte.repository');

const getAllPasaportes = async () => {
  return await pasaporteRepository.getAll();
};

const getPasaporteById = async (id) => {
  const item = await pasaporteRepository.getById(id);

  if (!item) {
    const error = new Error('Pasaporte no encontrado');
    error.status = 404;
    throw error;
  }

  return item;
};

const getPasaportesByPersonalId = async (personalId) => {
  return await pasaporteRepository.getByPersonalId(personalId);
};

const createPasaporte = async (data) => {
  return await pasaporteRepository.create(data);
};

const updatePasaporte = async (id, data) => {
  const item = await pasaporteRepository.update(id, data);

  if (!item) {
    const error = new Error('Pasaporte no encontrado');
    error.status = 404;
    throw error;
  }

  return item;
};

const deletePasaporte = async (id) => {
  const item = await pasaporteRepository.remove(id);

  if (!item) {
    const error = new Error('Pasaporte no encontrado');
    error.status = 404;
    throw error;
  }

  return item;
};

module.exports = {
  getAllPasaportes,
  getPasaporteById,
  getPasaportesByPersonalId,
  createPasaporte,
  updatePasaporte,
  deletePasaporte
};