const revisionJuridicaRepository = require('../repositories/revisionJuridica.repository');

const getAllRevisionJuridica = async () => {
  return await revisionJuridicaRepository.getAll();
};

const getRevisionJuridicaById = async (id) => {
  const item = await revisionJuridicaRepository.getById(id);

  if (!item) {
    const error = new Error('Revisión jurídica no encontrada');
    error.status = 404;
    throw error;
  }

  return item;
};

const createRevisionJuridica = async (data) => {
  return await revisionJuridicaRepository.create(data);
};

const updateRevisionJuridica = async (id, data) => {
  const item = await revisionJuridicaRepository.update(id, data);

  if (!item) {
    const error = new Error('Revisión jurídica no encontrada');
    error.status = 404;
    throw error;
  }

  return item;
};

const deleteRevisionJuridica = async (id) => {
  const item = await revisionJuridicaRepository.remove(id);

  if (!item) {
    const error = new Error('Revisión jurídica no encontrada');
    error.status = 404;
    throw error;
  }

  return item;
};

module.exports = {
  getAllRevisionJuridica,
  getRevisionJuridicaById,
  createRevisionJuridica,
  updateRevisionJuridica,
  deleteRevisionJuridica
};