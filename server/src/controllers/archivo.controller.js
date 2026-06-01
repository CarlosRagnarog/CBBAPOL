const archivoService = require('../services/archivo.service');

const getAll = async (req, res) => {
  try {
    const data = await archivoService.getAllArchivos();
    res.json({ ok: true, data });
  } catch (error) {
    res.status(error.status || 500).json({ ok: false, message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const data = await archivoService.getArchivoById(req.params.id);
    res.json({ ok: true, data });
  } catch (error) {
    res.status(error.status || 500).json({ ok: false, message: error.message });
  }
};

const create = async (req, res) => {
  try {
    const data = await archivoService.createArchivo(req.body);
    res.status(201).json({
      ok: true,
      message: 'Archivo registrado correctamente',
      data
    });
  } catch (error) {
    res.status(error.status || 500).json({ ok: false, message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const data = await archivoService.updateArchivo(req.params.id, req.body);
    res.json({
      ok: true,
      message: 'Archivo actualizado correctamente',
      data
    });
  } catch (error) {
    res.status(error.status || 500).json({ ok: false, message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const data = await archivoService.deleteArchivo(req.params.id);
    res.json({
      ok: true,
      message: 'Archivo eliminado correctamente',
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