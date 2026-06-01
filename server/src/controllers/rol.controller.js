const rolService = require('../services/rol.service');

const getAll = async (req, res) => {
  try {
    const data = await rolService.getAllRoles();
    res.json({ ok: true, data });
  } catch (error) {
    res.status(error.status || 500).json({ ok: false, message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const data = await rolService.getRolById(req.params.id);
    res.json({ ok: true, data });
  } catch (error) {
    res.status(error.status || 500).json({ ok: false, message: error.message });
  }
};

const create = async (req, res) => {
  try {
    const data = await rolService.createRol(req.body);
    res.status(201).json({
      ok: true,
      message: 'Rol registrado correctamente',
      data
    });
  } catch (error) {
    res.status(error.status || 500).json({ ok: false, message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const data = await rolService.updateRol(req.params.id, req.body);
    res.json({
      ok: true,
      message: 'Rol actualizado correctamente',
      data
    });
  } catch (error) {
    res.status(error.status || 500).json({ ok: false, message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const data = await rolService.deleteRol(req.params.id);
    res.json({
      ok: true,
      message: 'Rol eliminado correctamente',
      data
    });
  } catch (error) {
    res.status(error.status || 500).json({ ok: false, message: error.message });
  }
};

const asignarRolUsuario = async (req, res) => {
  try {
    const { usuario_id, rol_id } = req.body;
    const data = await rolService.asignarRolUsuario(usuario_id, rol_id);

    res.status(201).json({
      ok: true,
      message: 'Rol asignado correctamente',
      data
    });
  } catch (error) {
    res.status(error.status || 500).json({ ok: false, message: error.message });
  }
};

const quitarRolUsuario = async (req, res) => {
  try {
    const { usuario_id, rol_id } = req.body;
    const data = await rolService.quitarRolUsuario(usuario_id, rol_id);

    res.json({
      ok: true,
      message: 'Rol quitado correctamente',
      data
    });
  } catch (error) {
    res.status(error.status || 500).json({ ok: false, message: error.message });
  }
};

const rolesPorUsuario = async (req, res) => {
  try {
    const data = await rolService.rolesPorUsuario(req.params.usuario_id);
    res.json({ ok: true, data });
  } catch (error) {
    res.status(error.status || 500).json({ ok: false, message: error.message });
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  asignarRolUsuario,
  quitarRolUsuario,
  rolesPorUsuario
};