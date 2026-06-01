const correspondenciaService = require('../services/correspondencia.service');

const getAll = async (req, res) => {
  try {
    const data = await correspondenciaService.getAllCorrespondencias();
    res.json({ ok: true, data });
  } catch (error) {
    res.status(error.status || 500).json({ ok: false, message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const data = await correspondenciaService.getCorrespondenciaById(req.params.id);
    res.json({ ok: true, data });
  } catch (error) {
    res.status(error.status || 500).json({ ok: false, message: error.message });
  }
};

const create = async (req, res) => {
  try {
    const data = await correspondenciaService.createCorrespondencia(req.body);
    res.status(201).json({
      ok: true,
      message: 'Correspondencia registrada correctamente',
      data
    });
  } catch (error) {
    res.status(error.status || 500).json({ ok: false, message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const data = await correspondenciaService.updateCorrespondencia(req.params.id, req.body);
    res.json({
      ok: true,
      message: 'Correspondencia actualizada correctamente',
      data
    });
  } catch (error) {
    res.status(error.status || 500).json({ ok: false, message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const data = await correspondenciaService.deleteCorrespondencia(req.params.id);
    res.json({
      ok: true,
      message: 'Correspondencia eliminada correctamente',
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