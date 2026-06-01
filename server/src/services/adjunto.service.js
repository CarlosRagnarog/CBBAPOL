const adjuntoRepository = require('../repositories/adjunto.repository');

const getAllAdjuntos = async () => {
  return await adjuntoRepository.getAll();
};

const getAdjuntoById = async (id) => {
  const item = await adjuntoRepository.getById(id);

  if (!item) {
    const error = new Error('Adjunto no encontrado');
    error.status = 404;
    throw error;
  }

  return item;
};

const createAdjunto = async (file) => {
  if (!file) {
    const error = new Error('Debe subir un archivo');
    error.status = 400;
    throw error;
  }

  return await adjuntoRepository.create({
    filename: file.filename,
    mime: file.mimetype,
    size: file.size,
    url: `/uploads/${file.filename}`
  });
};

const deleteAdjunto = async (id) => {
  const item = await adjuntoRepository.remove(id);

  if (!item) {
    const error = new Error('Adjunto no encontrado');
    error.status = 404;
    throw error;
  }

  return item;
};

module.exports = {
  getAllAdjuntos,
  getAdjuntoById,
  createAdjunto,
  deleteAdjunto
};