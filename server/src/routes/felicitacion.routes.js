const express = require('express');
const felicitacionController = require('../controllers/felicitacion.controller');
const { verificarToken } = require('../middlewares/auth.middleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Felicitaciones
 *   description: Gestión de felicitaciones del personal
 */

/**
 * @swagger
 * /api/felicitaciones:
 *   get:
 *     summary: Listar felicitaciones
 *     tags: [Felicitaciones]
 *     security:
 *       - bearerAuth: []
 */
router.get('/', verificarToken, felicitacionController.getAll);

/**
 * @swagger
 * /api/felicitaciones/personal/{personal_id}:
 *   get:
 *     summary: Listar felicitaciones por personal
 *     tags: [Felicitaciones]
 *     security:
 *       - bearerAuth: []
 */
router.get('/personal/:personal_id', verificarToken, felicitacionController.getByPersonalId);

/**
 * @swagger
 * /api/felicitaciones/{id}:
 *   get:
 *     summary: Obtener felicitación por ID
 *     tags: [Felicitaciones]
 *     security:
 *       - bearerAuth: []
 */
router.get('/:id', verificarToken, felicitacionController.getById);

/**
 * @swagger
 * /api/felicitaciones:
 *   post:
 *     summary: Registrar felicitación
 *     tags: [Felicitaciones]
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
 *               nro_memo:
 *                 type: string
 *               fecha_entrega:
 *                 type: string
 *                 format: date
 *               motivo:
 *                 type: string
 *               autoridad_firma:
 *                 type: string
 */
router.post('/', verificarToken, felicitacionController.create);

/**
 * @swagger
 * /api/felicitaciones/{id}:
 *   put:
 *     summary: Actualizar felicitación
 *     tags: [Felicitaciones]
 *     security:
 *       - bearerAuth: []
 */
router.put('/:id', verificarToken, felicitacionController.update);

/**
 * @swagger
 * /api/felicitaciones/{id}:
 *   delete:
 *     summary: Eliminar felicitación
 *     tags: [Felicitaciones]
 *     security:
 *       - bearerAuth: []
 */
router.delete('/:id', verificarToken, felicitacionController.remove);

module.exports = router;