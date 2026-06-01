const situacionService = require('../services/situacion.service');

const getAll = async (req, res) => {
  try {
    const data = await situacionService.getAllSituaciones();
    res.json({ ok: true, data });
  } catch (error) {
    res.status(error.status || 500).json({ ok: false, message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const data = await situacionService.getSituacionById(req.params.id);
    res.json({ ok: true, data });
  } catch (error) {
    res.status(error.status || 500).json({ ok: false, message: error.message });
  }
};

const getByPersonalId = async (req, res) => {
  try {
    const data = await situacionService.getSituacionesByPersonalId(req.params.personal_id);
    res.json({ ok: true, data });
  } catch (error) {
    res.status(error.status || 500).json({ ok: false, message: error.message });
  }
};

const create = async (req, res) => {
  try {
    const data = await situacionService.createSituacion(req.body);
    res.status(201).json({
      ok: true,
      message: 'Situación registrada correctamente',
      data
    });
  } catch (error) {
    res.status(error.status || 500).json({ ok: false, message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const data = await situacionService.updateSituacion(req.params.id, req.body);
    res.json({
      ok: true,
      message: 'Situación actualizada correctamente',
      data
    });
  } catch (error) {
    res.status(error.status || 500).json({ ok: false, message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const data = await situacionService.deleteSituacion(req.params.id);
    res.json({
      ok: true,
      message: 'Situación eliminada correctamente',
      data
    });
  } catch (error) {
    res.status(error.status || 500).json({ ok: false, message: error.message });
  }
};

module.exports = {
  getAll,
  getById,
  getByPersonalId,
  create,
  update,
  remove
};