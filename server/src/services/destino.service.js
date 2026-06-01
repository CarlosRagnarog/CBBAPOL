const destinoRepository = require('../repositories/destino.repository');

const getAllDestinos = async () => {
  return await destinoRepository.getAll();
};

const getDestinoById = async (id) => {
  const destino = await destinoRepository.getById(id);

  if (!destino) {
    const error = new Error('Destino no encontrado');
    error.status = 404;
    throw error;
  }

  return destino;
};

const getDestinosByPersonalId = async (personalId) => {
  return await destinoRepository.getByPersonalId(personalId);
};

const createDestino = async (data) => {
  return await destinoRepository.create(data);
};

const updateDestino = async (id, data) => {
  const destino = await destinoRepository.update(id, data);

  if (!destino) {
    const error = new Error('Destino no encontrado');
    error.status = 404;
    throw error;
  }

  return destino;
};

const deleteDestino = async (id) => {
  const destino = await destinoRepository.remove(id);

  if (!destino) {
    const error = new Error('Destino no encontrado');
    error.status = 404;
    throw error;
  }

  return destino;
};

module.exports = {
  getAllDestinos,
  getDestinoById,
  getDestinosByPersonalId,
  createDestino,
  updateDestino,
  deleteDestino
};