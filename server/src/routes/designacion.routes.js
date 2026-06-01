const express = require('express');
const designacionController = require('../controllers/designacion.controller');
const { verificarToken } = require('../middlewares/auth.middleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Designaciones
 *   description: Gestión de designaciones del personal
 */

/**
 * @swagger
 * /api/designaciones:
 *   get:
 *     summary: Listar designaciones
 *     tags: [Designaciones]
 *     security:
 *       - bearerAuth: []
 */
router.get('/', verificarToken, designacionController.getAll);

/**
 * @swagger
 * /api/designaciones/personal/{personal_id}:
 *   get:
 *     summary: Listar designaciones por personal
 *     tags: [Designaciones]
 *     security:
 *       - bearerAuth: []
 */
router.get('/personal/:personal_id', verificarToken, designacionController.getByPersonalId);

/**
 * @swagger
 * /api/designaciones/{id}:
 *   get:
 *     summary: Obtener designación por ID
 *     tags: [Designaciones]
 *     security:
 *       - bearerAuth: []
 */
router.get('/:id', verificarToken, designacionController.getById);

/**
 * @swagger
 * /api/designaciones:
 *   post:
 *     summary: Registrar designación
 *     tags: [Designaciones]
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
 *               designacion:
 *                 type: string
 *               autoridad_firma:
 *                 type: string
 */
router.post('/', verificarToken, designacionController.create);

/**
 * @swagger
 * /api/designaciones/{id}:
 *   put:
 *     summary: Actualizar designación
 *     tags: [Designaciones]
 *     security:
 *       - bearerAuth: []
 */
router.put('/:id', verificarToken, designacionController.update);

/**
 * @swagger
 * /api/designaciones/{id}:
 *   delete:
 *     summary: Eliminar designación
 *     tags: [Designaciones]
 *     security:
 *       - bearerAuth: []
 */
router.delete('/:id', verificarToken, designacionController.remove);

module.exports = router;