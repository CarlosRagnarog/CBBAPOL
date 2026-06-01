const revisionJuridicaService = require('../services/revisionJuridica.service');

const getAll = async (req, res) => {
  try {
    const data = await revisionJuridicaService.getAllRevisionJuridica();
    res.json({ ok: true, data });
  } catch (error) {
    res.status(error.status || 500).json({ ok: false, message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const data = await revisionJuridicaService.getRevisionJuridicaById(req.params.id);
    res.json({ ok: true, data });
  } catch (error) {
    res.status(error.status || 500).json({ ok: false, message: error.message });
  }
};

const create = async (req, res) => {
  try {
    const data = await revisionJuridicaService.createRevisionJuridica(req.body);
    res.status(201).json({
      ok: true,
      message: 'Revisión jurídica registrada correctamente',
      data
    });
  } catch (error) {
    res.status(error.status || 500).json({ ok: false, message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const data = await revisionJuridicaService.updateRevisionJuridica(req.params.id, req.body);
    res.json({
      ok: true,
      message: 'Revisión jurídica actualizada correctamente',
      data
    });
  } catch (error) {
    res.status(error.status || 500).json({ ok: false, message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const data = await revisionJuridicaService.deleteRevisionJuridica(req.params.id);
    res.json({
      ok: true,
      message: 'Revisión jurídica eliminada correctamente',
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