const archivoRelService = require('../services/archivoRel.service');

const getAll = async (req, res) => {
  try {
    const data = await archivoRelService.getAllRelaciones();
    res.json({ ok: true, data });
  } catch (error) {
    res.status(error.status || 500).json({ ok: false, message: error.message });
  }
};

const getByEntity = async (req, res) => {
  try {
    const { entity_type, entity_id } = req.params;
    const data = await archivoRelService.getRelacionesByEntity(entity_type, entity_id);
    res.json({ ok: true, data });
  } catch (error) {
    res.status(error.status || 500).json({ ok: false, message: error.message });
  }
};

const create = async (req, res) => {
  try {
    const data = await archivoRelService.createRelacion(req.body);
    res.status(201).json({
      ok: true,
      message: 'Archivo vinculado correctamente',
      data
    });
  } catch (error) {
    res.status(error.status || 500).json({ ok: false, message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const data = await archivoRelService.deleteRelacion(req.params.id);
    res.json({
      ok: true,
      message: 'Vínculo de archivo eliminado correctamente',
      data
    });
  } catch (error) {
    res.status(error.status || 500).json({ ok: false, message: error.message });
  }
};

module.exports = {
  getAll,
  getByEntity,
  create,
  remove
};