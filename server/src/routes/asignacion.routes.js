const express = require('express');
const asignacionController = require('../controllers/asignacion.controller');
const { verificarToken } = require('../middlewares/auth.middleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Asignaciones
 *   description: Gestión de asignaciones del personal
 */

/**
 * @swagger
 * /api/asignaciones:
 *   get:
 *     summary: Listar asignaciones
 *     tags: [Asignaciones]
 *     security:
 *       - bearerAuth: []
 */
router.get('/', verificarToken, asignacionController.getAll);

/**
 * @swagger
 * /api/asignaciones/personal/{personal_id}:
 *   get:
 *     summary: Listar asignaciones por personal
 *     tags: [Asignaciones]
 *     security:
 *       - bearerAuth: []
 */
router.get('/personal/:personal_id', verificarToken, asignacionController.getByPersonalId);

/**
 * @swagger
 * /api/asignaciones/{id}:
 *   get:
 *     summary: Obtener asignación por ID
 *     tags: [Asignaciones]
 *     security:
 *       - bearerAuth: []
 */
router.get('/:id', verificarToken, asignacionController.getById);

/**
 * @swagger
 * /api/asignaciones:
 *   post:
 *     summary: Registrar asignación
 *     tags: [Asignaciones]
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
 *               institucion_id:
 *                 type: string
 *               cargo:
 *                 type: string
 *               unidad:
 *                 type: string
 *               desde:
 *                 type: string
 *                 format: date
 *               hasta:
 *                 type: string
 *                 format: date
 *               activo:
 *                 type: boolean
 */
router.post('/', verificarToken, asignacionController.create);

/**
 * @swagger
 * /api/asignaciones/{id}:
 *   put:
 *     summary: Actualizar asignación
 *     tags: [Asignaciones]
 *     security:
 *       - bearerAuth: []
 */
router.put('/:id', verificarToken, asignacionController.update);

/**
 * @swagger
 * /api/asignaciones/{id}:
 *   delete:
 *     summary: Desactivar asignación
 *     tags: [Asignaciones]
 *     security:
 *       - bearerAuth: []
 */
router.delete('/:id', verificarToken, asignacionController.remove);

module.exports = router;