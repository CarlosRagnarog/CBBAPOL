const usuarioService = require('../services/usuario.service');

const getAll = async (req, res) => {
  try {
    const data = await usuarioService.getAllUsuarios();
    res.json({ ok: true, data });
  } catch (error) {
    res.status(error.status || 500).json({ ok: false, message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const data = await usuarioService.getUsuarioById(req.params.id);
    res.json({ ok: true, data });
  } catch (error) {
    res.status(error.status || 500).json({ ok: false, message: error.message });
  }
};

const create = async (req, res) => {
  try {
    const data = await usuarioService.createUsuario(req.body);
    res.status(201).json({
      ok: true,
      message: 'Usuario registrado correctamente',
      data
    });
  } catch (error) {
    res.status(error.status || 500).json({ ok: false, message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const data = await usuarioService.updateUsuario(req.params.id, req.body);
    res.json({
      ok: true,
      message: 'Usuario actualizado correctamente',
      data
    });
  } catch (error) {
    res.status(error.status || 500).json({ ok: false, message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const data = await usuarioService.deleteUsuario(req.params.id);
    res.json({
      ok: true,
      message: 'Usuario desactivado correctamente',
      data
    });
  } catch (error) {
    res.status(error.status || 500).json({ ok: false, message: error.message });
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};