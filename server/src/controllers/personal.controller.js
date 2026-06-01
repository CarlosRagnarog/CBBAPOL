const personalService = require('../services/personal.service');

const getAll = async (req, res) => {
  try {
    const data = await personalService.getAllPersonal(req.query);

    res.json({
      ok: true,
      data
    });
  } catch (error) {
    res.status(error.status || 500).json({
      ok: false,
      message: error.message
    });
  }
};

const getById = async (req, res) => {
  try {
    const data = await personalService.getPersonalById(req.params.id);

    res.json({
      ok: true,
      data
    });
  } catch (error) {
    res.status(error.status || 500).json({
      ok: false,
      message: error.message
    });
  }
};

const create = async (req, res) => {
  try {
    const data = await personalService.createPersonal(req.body);

    res.status(201).json({
      ok: true,
      message: 'Personal registrado correctamente',
      data
    });
  } catch (error) {
    res.status(error.status || 500).json({
      ok: false,
      message: error.message
    });
  }
};

const update = async (req, res) => {
  try {
    const data = await personalService.updatePersonal(req.params.id, req.body);

    res.json({
      ok: true,
      message: 'Personal actualizado correctamente',
      data
    });
  } catch (error) {
    res.status(error.status || 500).json({
      ok: false,
      message: error.message
    });
  }
};

const remove = async (req, res) => {
  try {
    const data = await personalService.deletePersonal(req.params.id);

    res.json({
      ok: true,
      message: 'Personal eliminado correctamente',
      data
    });
  } catch (error) {
    res.status(error.status || 500).json({
      ok: false,
      message: error.message
    });
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};