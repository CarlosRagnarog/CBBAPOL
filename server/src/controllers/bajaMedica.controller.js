const bajaMedicaService = require('../services/bajaMedica.service');

const getAll = async (req, res) => {
  try {
    const data = await bajaMedicaService.getAllBajasMedicas();
    res.json({ ok: true, data });
  } catch (error) {
    res.status(error.status || 500).json({ ok: false, message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const data = await bajaMedicaService.getBajaMedicaById(req.params.id);
    res.json({ ok: true, data });
  } catch (error) {
    res.status(error.status || 500).json({ ok: false, message: error.message });
  }
};

const getByPersonalId = async (req, res) => {
  try {
    const data = await bajaMedicaService.getBajasMedicasByPersonalId(req.params.personal_id);
    res.json({ ok: true, data });
  } catch (error) {
    res.status(error.status || 500).json({ ok: false, message: error.message });
  }
};

const create = async (req, res) => {
  try {
    const data = await bajaMedicaService.createBajaMedica(req.body);
    res.status(201).json({
      ok: true,
      message: 'Baja médica registrada correctamente',
      data
    });
  } catch (error) {
    res.status(error.status || 500).json({ ok: false, message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const data = await bajaMedicaService.updateBajaMedica(req.params.id, req.body);
    res.json({
      ok: true,
      message: 'Baja médica actualizada correctamente',
      data
    });
  } catch (error) {
    res.status(error.status || 500).json({ ok: false, message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const data = await bajaMedicaService.deleteBajaMedica(req.params.id);
    res.json({
      ok: true,
      message: 'Baja médica eliminada correctamente',
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