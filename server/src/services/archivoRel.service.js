const archivoRelRepository = require('../repositories/archivoRel.repository');

const getAllRelaciones = async () => {
  return await archivoRelRepository.getAll();
};

const getRelacionesByEntity = async (entityType, entityId) => {
  return await archivoRelRepository.getByEntity(entityType, entityId);
};

const createRelacion = async (data) => {
  return await archivoRelRepository.create(data);
};

const deleteRelacion = async (id) => {
  const item = await archivoRelRepository.remove(id);

  if (!item) {
    const error = new Error('Relación de archivo no encontrada');
    error.status = 404;
    throw error;
  }

  return item;
};

module.exports = {
  getAllRelaciones,
  getRelacionesByEntity,
  createRelacion,
  deleteRelacion
};