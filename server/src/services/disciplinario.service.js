const disciplinarioRepository = require('../repositories/disciplinario.repository');

const getAllDisciplinario = async () => {
  return await disciplinarioRepository.getAll();
};

const getDisciplinarioById = async (id) => {
  const item = await disciplinarioRepository.getById(id);

  if (!item) {
    const error = new Error('Registro disciplinario no encontrado');
    error.status = 404;
    throw error;
  }

  return item;
};

const getDisciplinarioByPersonalId = async (personalId) => {
  return await disciplinarioRepository.getByPersonalId(personalId);
};

const createDisciplinario = async (data) => {
  return await disciplinarioRepository.create(data);
};

const updateDisciplinario = async (id, data) => {
  const item = await disciplinarioRepository.update(id, data);

  if (!item) {
    const error = new Error('Registro disciplinario no encontrado');
    error.status = 404;
    throw error;
  }

  return item;
};

const deleteDisciplinario = async (id) => {
  const item = await disciplinarioRepository.remove(id);

  if (!item) {
    const error = new Error('Registro disciplinario no encontrado');
    error.status = 404;
    throw error;
  }

  return item;
};

module.exports = {
  getAllDisciplinario,
  getDisciplinarioById,
  getDisciplinarioByPersonalId,
  createDisciplinario,
  updateDisciplinario,
  deleteDisciplinario
};