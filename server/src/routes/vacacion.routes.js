const express = require('express');
const vacacionController = require('../controllers/vacacion.controller');
const { verificarToken } = require('../middlewares/auth.middleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Vacaciones
 *   description: Gestión de vacaciones del personal
 */

/**
 * @swagger
 * /api/vacaciones:
 *   get:
 *     summary: Listar vacaciones
 *     tags: [Vacaciones]
 *     security:
 *       - bearerAuth: []
 */
router.get('/', verificarToken, vacacionController.getAll);

/**
 * @swagger
 * /api/vacaciones/personal/{personal_id}:
 *   get:
 *     summary: Listar vacaciones por personal
 *     tags: [Vacaciones]
 *     security:
 *       - bearerAuth: []
 */
router.get('/personal/:personal_id', verificarToken, vacacionController.getByPersonalId);

/**
 * @swagger
 * /api/vacaciones/{id}:
 *   get:
 *     summary: Obtener vacación por ID
 *     tags: [Vacaciones]
 *     security:
 *       - bearerAuth: []
 */
router.get('/:id', verificarToken, vacacionController.getById);

/**
 * @swagger
 * /api/vacaciones:
 *   post:
 *     summary: Registrar vacación
 *     tags: [Vacaciones]
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
 *               nro_memo:
 *                 type: string
 *               desde:
 *                 type: string
 *                 format: date
 *               hasta:
 *                 type: string
 *                 format: date
 *               dias:
 *                 type: integer
 *               observaciones:
 *                 type: string
 *               autoridad_firma:
 *                 type: string
 */
router.post('/', verificarToken, vacacionController.create);

/**
 * @swagger
 * /api/vacaciones/{id}:
 *   put:
 *     summary: Actualizar vacación
 *     tags: [Vacaciones]
 *     security:
 *       - bearerAuth: []
 */
router.put('/:id', verificarToken, vacacionController.update);

/**
 * @swagger
 * /api/vacaciones/{id}:
 *   delete:
 *     summary: Eliminar vacación
 *     tags: [Vacaciones]
 *     security:
 *       - bearerAuth: []
 */
router.delete('/:id', verificarToken, vacacionController.remove);

module.exports = router;