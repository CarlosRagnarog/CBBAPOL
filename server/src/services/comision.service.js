const comisionRepository = require('../repositories/comision.repository');

const getAllComisiones = async () => {
  return await comisionRepository.getAll();
};

const getComisionById = async (id) => {
  const comision = await comisionRepository.getById(id);

  if (!comision) {
    const error = new Error('Comisión no encontrada');
    error.status = 404;
    throw error;
  }

  return comision;
};

const getComisionesByPersonalId = async (personalId) => {
  return await comisionRepository.getByPersonalId(personalId);
};

const createComision = async (data) => {
  return await comisionRepository.create(data);
};

const updateComision = async (id, data) => {
  const comision = await comisionRepository.update(id, data);

  if (!comision) {
    const error = new Error('Comisión no encontrada');
    error.status = 404;
    throw error;
  }

  return comision;
};

const deleteComision = async (id) => {
  const comision = await comisionRepository.remove(id);

  if (!comision) {
    const error = new Error('Comisión no encontrada');
    error.status = 404;
    throw error;
  }

  return comision;
};

module.exports = {
  getAllComisiones,
  getComisionById,
  getComisionesByPersonalId,
  createComision,
  updateComision,
  deleteComision
};