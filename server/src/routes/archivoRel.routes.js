const express = require('express');
const archivoRelController = require('../controllers/archivoRel.controller');
const { verificarToken } = require('../middlewares/auth.middleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Archivos Relacionados
 *   description: Vinculación de archivos con módulos del sistema
 */

/**
 * @swagger
 * /api/archivos-rel:
 *   get:
 *     summary: Listar relaciones de archivos
 *     tags: [Archivos Relacionados]
 *     security:
 *       - bearerAuth: []
 */
router.get('/', verificarToken, archivoRelController.getAll);

/**
 * @swagger
 * /api/archivos-rel/{entity_type}/{entity_id}:
 *   get:
 *     summary: Listar archivos por entidad
 *     tags: [Archivos Relacionados]
 *     security:
 *       - bearerAuth: []
 */
router.get('/:entity_type/:entity_id', verificarToken, archivoRelController.getByEntity);

/**
 * @swagger
 * /api/archivos-rel:
 *   post:
 *     summary: Vincular archivo a una entidad
 *     tags: [Archivos Relacionados]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               entity_type:
 *                 type: string
 *                 example: personal
 *               entity_id:
 *                 type: string
 *               archivo_id:
 *                 type: integer
 */
router.post('/', verificarToken, archivoRelController.create);

/**
 * @swagger
 * /api/archivos-rel/{id}:
 *   delete:
 *     summary: Eliminar vínculo de archivo
 *     tags: [Archivos Relacionados]
 *     security:
 *       - bearerAuth: []
 */
router.delete('/:id', verificarToken, archivoRelController.remove);

module.exports = router;