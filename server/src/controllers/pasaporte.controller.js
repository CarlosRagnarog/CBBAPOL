const pasaporteService = require('../services/pasaporte.service');

const getAll = async (req, res) => {
  try {
    const data = await pasaporteService.getAllPasaportes();
    res.json({ ok: true, data });
  } catch (error) {
    res.status(error.status || 500).json({ ok: false, message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const data = await pasaporteService.getPasaporteById(req.params.id);
    res.json({ ok: true, data });
  } catch (error) {
    res.status(error.status || 500).json({ ok: false, message: error.message });
  }
};

const getByPersonalId = async (req, res) => {
  try {
    const data = await pasaporteService.getPasaportesByPersonalId(req.params.personal_id);
    res.json({ ok: true, data });
  } catch (error) {
    res.status(error.status || 500).json({ ok: false, message: error.message });
  }
};

const create = async (req, res) => {
  try {
    const data = await pasaporteService.createPasaporte(req.body);
    res.status(201).json({
      ok: true,
      message: 'Pasaporte registrado correctamente',
      data
    });
  } catch (error) {
    res.status(error.status || 500).json({ ok: false, message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const data = await pasaporteService.updatePasaporte(req.params.id, req.body);
    res.json({
      ok: true,
      message: 'Pasaporte actualizado correctamente',
      data
    });
  } catch (error) {
    res.status(error.status || 500).json({ ok: false, message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const data = await pasaporteService.deletePasaporte(req.params.id);
    res.json({
      ok: true,
      message: 'Pasaporte eliminado correctamente',
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