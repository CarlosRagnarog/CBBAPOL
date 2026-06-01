const archivoRepository = require('../repositories/archivo.repository');

const getAllArchivos = async () => {
  return await archivoRepository.getAll();
};

const getArchivoById = async (id) => {
  const item = await archivoRepository.getById(id);

  if (!item) {
    const error = new Error('Archivo no encontrado');
    error.status = 404;
    throw error;
  }

  return item;
};

const createArchivo = async (data) => {
  return await archivoRepository.create(data);
};

const updateArchivo = async (id, data) => {
  const item = await archivoRepository.update(id, data);

  if (!item) {
    const error = new Error('Archivo no encontrado');
    error.status = 404;
    throw error;
  }

  return item;
};

const deleteArchivo = async (id) => {
  const item = await archivoRepository.remove(id);

  if (!item) {
    const error = new Error('Archivo no encontrado');
    error.status = 404;
    throw error;
  }

  return item;
};

module.exports = {
  getAllArchivos,
  getArchivoById,
  createArchivo,
  updateArchivo,
  deleteArchivo
};