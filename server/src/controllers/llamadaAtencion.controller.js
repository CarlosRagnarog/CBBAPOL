const llamadaAtencionService = require('../services/llamadaAtencion.service');

const getAll = async (req, res) => {
  try {
    const data = await llamadaAtencionService.getAllLlamadasAtencion();
    res.json({ ok: true, data });
  } catch (error) {
    res.status(error.status || 500).json({ ok: false, message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const data = await llamadaAtencionService.getLlamadaAtencionById(req.params.id);
    res.json({ ok: true, data });
  } catch (error) {
    res.status(error.status || 500).json({ ok: false, message: error.message });
  }
};

const getByPersonalId = async (req, res) => {
  try {
    const data = await llamadaAtencionService.getLlamadasAtencionByPersonalId(req.params.personal_id);
    res.json({ ok: true, data });
  } catch (error) {
    res.status(error.status || 500).json({ ok: false, message: error.message });
  }
};

const create = async (req, res) => {
  try {
    const data = await llamadaAtencionService.createLlamadaAtencion(req.body);
    res.status(201).json({
      ok: true,
      message: 'Llamada de atención registrada correctamente',
      data
    });
  } catch (error) {
    res.status(error.status || 500).json({ ok: false, message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const data = await llamadaAtencionService.updateLlamadaAtencion(req.params.id, req.body);
    res.json({
      ok: true,
      message: 'Llamada de atención actualizada correctamente',
      data
    });
  } catch (error) {
    res.status(error.status || 500).json({ ok: false, message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const data = await llamadaAtencionService.deleteLlamadaAtencion(req.params.id);
    res.json({
      ok: true,
      message: 'Llamada de atención eliminada correctamente',
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