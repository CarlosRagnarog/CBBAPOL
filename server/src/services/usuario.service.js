const bcrypt = require('bcrypt');
const usuarioRepository = require('../repositories/usuario.repository');

const getAllUsuarios = async () => {
  return await usuarioRepository.getAll();
};

const getUsuarioById = async (id) => {
  const usuario = await usuarioRepository.getById(id);

  if (!usuario) {
    const error = new Error('Usuario no encontrado');
    error.status = 404;
    throw error;
  }

  return usuario;
};

const createUsuario = async (data) => {
  const existeEmail = await usuarioRepository.findByEmail(data.email);

  if (existeEmail) {
    const error = new Error('El email ya está registrado');
    error.status = 400;
    throw error;
  }

  const password_hash = await bcrypt.hash(data.password, 10);

  return await usuarioRepository.create({
    ...data,
    password_hash
  });
};

const updateUsuario = async (id, data) => {
  const usuario = await usuarioRepository.update(id, data);

  if (!usuario) {
    const error = new Error('Usuario no encontrado');
    error.status = 404;
    throw error;
  }

  return usuario;
};

const deleteUsuario = async (id) => {
  const usuario = await usuarioRepository.remove(id);

  if (!usuario) {
    const error = new Error('Usuario no encontrado');
    error.status = 404;
    throw error;
  }

  return usuario;
};

module.exports = {
  getAllUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario
};