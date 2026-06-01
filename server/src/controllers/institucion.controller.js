const institucionService = require('../services/institucion.service');

const getAll = async (req, res) => {
  try {
    const data = await institucionService.getAllInstituciones();
    res.json({ ok: true, data });
  } catch (error) {
    res.status(error.status || 500).json({ ok: false, message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const data = await institucionService.getInstitucionById(req.params.id);
    res.json({ ok: true, data });
  } catch (error) {
    res.status(error.status || 500).json({ ok: false, message: error.message });
  }
};

const create = async (req, res) => {
  try {
    const data = await institucionService.createInstitucion(req.body);
    res.status(201).json({
      ok: true,
      message: 'Institución registrada correctamente',
      data
    });
  } catch (error) {
    res.status(error.status || 500).json({ ok: false, message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const data = await institucionService.updateInstitucion(req.params.id, req.body);
    res.json({
      ok: true,
      message: 'Institución actualizada correctamente',
      data
    });
  } catch (error) {
    res.status(error.status || 500).json({ ok: false, message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const data = await institucionService.deleteInstitucion(req.params.id);
    res.json({
      ok: true,
      message: 'Institución eliminada correctamente',
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