const designacionRepository = require('../repositories/designacion.repository');

const getAllDesignaciones = async () => {
  return await designacionRepository.getAll();
};

const getDesignacionById = async (id) => {
  const item = await designacionRepository.getById(id);

  if (!item) {
    const error = new Error('Designación no encontrada');
    error.status = 404;
    throw error;
  }

  return item;
};

const getDesignacionesByPersonalId = async (personalId) => {
  return await designacionRepository.getByPersonalId(personalId);
};

const createDesignacion = async (data) => {
  return await designacionRepository.create(data);
};

const updateDesignacion = async (id, data) => {
  const item = await designacionRepository.update(id, data);

  if (!item) {
    const error = new Error('Designación no encontrada');
    error.status = 404;
    throw error;
  }

  return item;
};

const deleteDesignacion = async (id) => {
  const item = await designacionRepository.remove(id);

  if (!item) {
    const error = new Error('Designación no encontrada');
    error.status = 404;
    throw error;
  }

  return item;
};

module.exports = {
  getAllDesignaciones,
  getDesignacionById,
  getDesignacionesByPersonalId,
  createDesignacion,
  updateDesignacion,
  deleteDesignacion
};