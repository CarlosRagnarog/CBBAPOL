const institucionRepository = require('../repositories/institucion.repository');

const getAllInstituciones = async () => {
  return await institucionRepository.getAll();
};

const getInstitucionById = async (id) => {
  const institucion = await institucionRepository.getById(id);

  if (!institucion) {
    const error = new Error('Institución no encontrada');
    error.status = 404;
    throw error;
  }

  return institucion;
};

const createInstitucion = async (data) => {
  return await institucionRepository.create(data);
};

const updateInstitucion = async (id, data) => {
  const institucion = await institucionRepository.update(id, data);

  if (!institucion) {
    const error = new Error('Institución no encontrada');
    error.status = 404;
    throw error;
  }

  return institucion;
};

const deleteInstitucion = async (id) => {
  const institucion = await institucionRepository.remove(id);

  if (!institucion) {
    const error = new Error('Institución no encontrada');
    error.status = 404;
    throw error;
  }

  return institucion;
};

module.exports = {
  getAllInstituciones,
  getInstitucionById,
  createInstitucion,
  updateInstitucion,
  deleteInstitucion
};