const llamadaAtencionRepository = require('../repositories/llamadaAtencion.repository');

const getAllLlamadasAtencion = async () => {
  return await llamadaAtencionRepository.getAll();
};

const getLlamadaAtencionById = async (id) => {
  const item = await llamadaAtencionRepository.getById(id);

  if (!item) {
    const error = new Error('Llamada de atención no encontrada');
    error.status = 404;
    throw error;
  }

  return item;
};

const getLlamadasAtencionByPersonalId = async (personalId) => {
  return await llamadaAtencionRepository.getByPersonalId(personalId);
};

const createLlamadaAtencion = async (data) => {
  return await llamadaAtencionRepository.create(data);
};

const updateLlamadaAtencion = async (id, data) => {
  const item = await llamadaAtencionRepository.update(id, data);

  if (!item) {
    const error = new Error('Llamada de atención no encontrada');
    error.status = 404;
    throw error;
  }

  return item;
};

const deleteLlamadaAtencion = async (id) => {
  const item = await llamadaAtencionRepository.remove(id);

  if (!item) {
    const error = new Error('Llamada de atención no encontrada');
    error.status = 404;
    throw error;
  }

  return item;
};

module.exports = {
  getAllLlamadasAtencion,
  getLlamadaAtencionById,
  getLlamadasAtencionByPersonalId,
  createLlamadaAtencion,
  updateLlamadaAtencion,
  deleteLlamadaAtencion
};