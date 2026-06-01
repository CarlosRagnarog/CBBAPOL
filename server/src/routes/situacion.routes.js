const express = require('express');
const situacionController = require('../controllers/situacion.controller');
const { verificarToken } = require('../middlewares/auth.middleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Situaciones
 *   description: Gestión de situaciones administrativas
 */

/**
 * @swagger
 * /api/situaciones:
 *   get:
 *     summary: Listar situaciones
 *     tags: [Situaciones]
 *     security:
 *       - bearerAuth: []
 */
router.get('/', verificarToken, situacionController.getAll);

/**
 * @swagger
 * /api/situaciones/personal/{personal_id}:
 *   get:
 *     summary: Listar situaciones por personal
 *     tags: [Situaciones]
 *     security:
 *       - bearerAuth: []
 */
router.get('/personal/:personal_id', verificarToken, situacionController.getByPersonalId);

/**
 * @swagger
 * /api/situaciones/{id}:
 *   get:
 *     summary: Obtener situación por ID
 *     tags: [Situaciones]
 *     security:
 *       - bearerAuth: []
 */
router.get('/:id', verificarToken, situacionController.getById);

/**
 * @swagger
 * /api/situaciones:
 *   post:
 *     summary: Registrar situación
 *     tags: [Situaciones]
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
 *               tipo:
 *                 type: string
 *               causal:
 *                 type: string
 *               fecha_inicio:
 *                 type: string
 *                 format: date
 *               fecha_retorno:
 *                 type: string
 *                 format: date
 *               situacion_actual:
 *                 type: string
 *               observaciones:
 *                 type: string
 */
router.post('/', verificarToken, situacionController.create);

/**
 * @swagger
 * /api/situaciones/{id}:
 *   put:
 *     summary: Actualizar situación
 *     tags: [Situaciones]
 *     security:
 *       - bearerAuth: []
 */
router.put('/:id', verificarToken, situacionController.update);

/**
 * @swagger
 * /api/situaciones/{id}:
 *   delete:
 *     summary: Eliminar situación
 *     tags: [Situaciones]
 *     security:
 *       - bearerAuth: []
 */
router.delete('/:id', verificarToken, situacionController.remove);

module.exports = router;