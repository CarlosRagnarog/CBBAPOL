const adjuntoService = require('../services/adjunto.service');

const getAll = async (req, res) => {
  try {
    const data = await adjuntoService.getAllAdjuntos();
    res.json({ ok: true, data });
  } catch (error) {
    res.status(error.status || 500).json({ ok: false, message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const data = await adjuntoService.getAdjuntoById(req.params.id);
    res.json({ ok: true, data });
  } catch (error) {
    res.status(error.status || 500).json({ ok: false, message: error.message });
  }
};

const upload = async (req, res) => {
  try {
    const data = await adjuntoService.createAdjunto(req.file);
    res.status(201).json({
      ok: true,
      message: 'Archivo subido correctamente',
      data
    });
  } catch (error) {
    res.status(error.status || 500).json({ ok: false, message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const data = await adjuntoService.deleteAdjunto(req.params.id);
    res.json({
      ok: true,
      message: 'Adjunto eliminado correctamente',
      data
    });
  } catch (error) {
    res.status(error.status || 500).json({ ok: false, message: error.message });
  }
};

module.exports = {
  getAll,
  getById,
  upload,
  remove
};