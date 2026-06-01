const personalRepository = require('../repositories/personal.repository');

const getAllPersonal = async (query) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const offset = (page - 1) * limit;
  const search = query.search || '';

  return await personalRepository.getAll({ search, limit, offset });
};

const getPersonalById = async (id) => {
  const personal = await personalRepository.getById(id);

  if (!personal) {
    const error = new Error('Personal no encontrado');
    error.status = 404;
    throw error;
  }

  return personal;
};

const createPersonal = async (data) => {
  const existeCi = await personalRepository.findByCi(data.ci);

  if (existeCi) {
    const error = new Error('El CI ya está registrado');
    error.status = 400;
    throw error;
  }

  if (data.escalafon) {
    const existeEscalafon = await personalRepository.findByEscalafon(data.escalafon);

    if (existeEscalafon) {
      const error = new Error('El escalafón ya está registrado');
      error.status = 400;
      throw error;
    }
  }

  return await personalRepository.create(data);
};

const updatePersonal = async (id, data) => {
  const personal = await personalRepository.update(id, data);

  if (!personal) {
    const error = new Error('Personal no encontrado');
    error.status = 404;
    throw error;
  }

  return personal;
};

const deletePersonal = async (id) => {
  const personal = await personalRepository.remove(id);

  if (!personal) {
    const error = new Error('Personal no encontrado');
    error.status = 404;
    throw error;
  }

  return personal;
};

module.exports = {
  getAllPersonal,
  getPersonalById,
  createPersonal,
  updatePersonal,
  deletePersonal
};