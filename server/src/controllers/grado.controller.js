const gradoService = require('../services/grado.service');

const getAll = async (req, res) => {
  try {
    const data = await gradoService.getAllGrados();
    res.json({ ok: true, data });
  } catch (error) {
    res.status(error.status || 500).json({ ok: false, message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const data = await gradoService.getGradoById(req.params.id);
    res.json({ ok: true, data });
  } catch (error) {
    res.status(error.status || 500).json({ ok: false, message: error.message });
  }
};

const create = async (req, res) => {
  try {
    const data = await gradoService.createGrado(req.body);
    res.status(201).json({
      ok: true,
      message: 'Grado registrado correctamente',
      data
    });
  } catch (error) {
    res.status(error.status || 500).json({ ok: false, message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const data = await gradoService.updateGrado(req.params.id, req.body);
    res.json({
      ok: true,
      message: 'Grado actualizado correctamente',
      data
    });
  } catch (error) {
    res.status(error.status || 500).json({ ok: false, message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const data = await gradoService.deleteGrado(req.params.id);
    res.json({
      ok: true,
      message: 'Grado eliminado correctamente',
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