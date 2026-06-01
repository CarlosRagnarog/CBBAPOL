const correspondenciaRepository = require('../repositories/correspondencia.repository');

const getAllCorrespondencias = async () => {
  return await correspondenciaRepository.getAll();
};

const getCorrespondenciaById = async (id) => {
  const item = await correspondenciaRepository.getById(id);

  if (!item) {
    const error = new Error('Correspondencia no encontrada');
    error.status = 404;
    throw error;
  }

  return item;
};

const createCorrespondencia = async (data) => {
  return await correspondenciaRepository.create(data);
};

const updateCorrespondencia = async (id, data) => {
  const item = await correspondenciaRepository.update(id, data);

  if (!item) {
    const error = new Error('Correspondencia no encontrada');
    error.status = 404;
    throw error;
  }

  return item;
};

const deleteCorrespondencia = async (id) => {
  const item = await correspondenciaRepository.remove(id);

  if (!item) {
    const error = new Error('Correspondencia no encontrada');
    error.status = 404;
    throw error;
  }

  return item;
};

module.exports = {
  getAllCorrespondencias,
  getCorrespondenciaById,
  createCorrespondencia,
  updateCorrespondencia,
  deleteCorrespondencia
};