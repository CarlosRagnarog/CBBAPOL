const gradoRepository = require('../repositories/grado.repository');

const getAllGrados = async () => {
  return await gradoRepository.getAll();
};

const getGradoById = async (id) => {
  const grado = await gradoRepository.getById(id);

  if (!grado) {
    const error = new Error('Grado no encontrado');
    error.status = 404;
    throw error;
  }

  return grado;
};

const createGrado = async (data) => {
  return await gradoRepository.create(data);
};

const updateGrado = async (id, data) => {
  const grado = await gradoRepository.update(id, data);

  if (!grado) {
    const error = new Error('Grado no encontrado');
    error.status = 404;
    throw error;
  }

  return grado;
};

const deleteGrado = async (id) => {
  const grado = await gradoRepository.remove(id);

  if (!grado) {
    const error = new Error('Grado no encontrado');
    error.status = 404;
    throw error;
  }

  return grado;
};

module.exports = {
  getAllGrados,
  getGradoById,
  createGrado,
  updateGrado,
  deleteGrado
};