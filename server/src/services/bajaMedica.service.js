const bajaMedicaRepository = require('../repositories/bajaMedica.repository');

const getAllBajasMedicas = async () => {
  return await bajaMedicaRepository.getAll();
};

const getBajaMedicaById = async (id) => {
  const bajaMedica = await bajaMedicaRepository.getById(id);

  if (!bajaMedica) {
    const error = new Error('Baja médica no encontrada');
    error.status = 404;
    throw error;
  }

  return bajaMedica;
};

const getBajasMedicasByPersonalId = async (personalId) => {
  return await bajaMedicaRepository.getByPersonalId(personalId);
};

const createBajaMedica = async (data) => {
  return await bajaMedicaRepository.create(data);
};

const updateBajaMedica = async (id, data) => {
  const bajaMedica = await bajaMedicaRepository.update(id, data);

  if (!bajaMedica) {
    const error = new Error('Baja médica no encontrada');
    error.status = 404;
    throw error;
  }

  return bajaMedica;
};

const deleteBajaMedica = async (id) => {
  const bajaMedica = await bajaMedicaRepository.remove(id);

  if (!bajaMedica) {
    const error = new Error('Baja médica no encontrada');
    error.status = 404;
    throw error;
  }

  return bajaMedica;
};

module.exports = {
  getAllBajasMedicas,
  getBajaMedicaById,
  getBajasMedicasByPersonalId,
  createBajaMedica,
  updateBajaMedica,
  deleteBajaMedica
};