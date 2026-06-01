const express = require('express');
const bajaMedicaController = require('../controllers/bajaMedica.controller');
const { verificarToken } = require('../middlewares/auth.middleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Bajas Médicas
 *   description: Gestión de bajas médicas del personal
 */

/**
 * @swagger
 * /api/bajas-medicas:
 *   get:
 *     summary: Listar bajas médicas
 *     tags: [Bajas Médicas]
 *     security:
 *       - bearerAuth: []
 */
router.get('/', verificarToken, bajaMedicaController.getAll);

/**
 * @swagger
 * /api/bajas-medicas/personal/{personal_id}:
 *   get:
 *     summary: Listar bajas médicas por personal
 *     tags: [Bajas Médicas]
 *     security:
 *       - bearerAuth: []
 */
router.get('/personal/:personal_id', verificarToken, bajaMedicaController.getByPersonalId);

/**
 * @swagger
 * /api/bajas-medicas/{id}:
 *   get:
 *     summary: Obtener baja médica por ID
 *     tags: [Bajas Médicas]
 *     security:
 *       - bearerAuth: []
 */
router.get('/:id', verificarToken, bajaMedicaController.getById);

/**
 * @swagger
 * /api/bajas-medicas:
 *   post:
 *     summary: Registrar baja médica
 *     tags: [Bajas Médicas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               personal_id:
 *                 type: string
 *               nro:
 *                 type: string
 *               nro_folio:
 *                 type: string
 *               desde:
 *                 type: string
 *                 format: date
 *               hasta:
 *                 type: string
 *                 format: date
 *               institucion_medica:
 *                 type: string
 *               observaciones:
 *                 type: string
 */
router.post('/', verificarToken, bajaMedicaController.create);

/**
 * @swagger
 * /api/bajas-medicas/{id}:
 *   put:
 *     summary: Actualizar baja médica
 *     tags: [Bajas Médicas]
 *     security:
 *       - bearerAuth: []
 */
router.put('/:id', verificarToken, bajaMedicaController.update);

/**
 * @swagger
 * /api/bajas-medicas/{id}:
 *   delete:
 *     summary: Eliminar baja médica
 *     tags: [Bajas Médicas]
 *     security:
 *       - bearerAuth: []
 */
router.delete('/:id', verificarToken, bajaMedicaController.remove);

module.exports = router;