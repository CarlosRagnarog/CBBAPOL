const comisionService = require('../services/comision.service');

const getAll = async (req, res) => {
  try {
    const data = await comisionService.getAllComisiones();
    res.json({ ok: true, data });
  } catch (error) {
    res.status(error.status || 500).json({ ok: false, message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const data = await comisionService.getComisionById(req.params.id);
    res.json({ ok: true, data });
  } catch (error) {
    res.status(error.status || 500).json({ ok: false, message: error.message });
  }
};

const getByPersonalId = async (req, res) => {
  try {
    const data = await comisionService.getComisionesByPersonalId(req.params.personal_id);
    res.json({ ok: true, data });
  } catch (error) {
    res.status(error.status || 500).json({ ok: false, message: error.message });
  }
};

const create = async (req, res) => {
  try {
    const data = await comisionService.createComision(req.body);
    res.status(201).json({
      ok: true,
      message: 'Comisión registrada correctamente',
      data
    });
  } catch (error) {
    res.status(error.status || 500).json({ ok: false, message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const data = await comisionService.updateComision(req.params.id, req.body);
    res.json({
      ok: true,
      message: 'Comisión actualizada correctamente',
      data
    });
  } catch (error) {
    res.status(error.status || 500).json({ ok: false, message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const data = await comisionService.deleteComision(req.params.id);
    res.json({
      ok: true,
      message: 'Comisión eliminada correctamente',
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