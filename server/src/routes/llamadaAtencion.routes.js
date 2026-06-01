const express = require('express');
const llamadaAtencionController = require('../controllers/llamadaAtencion.controller');
const { verificarToken } = require('../middlewares/auth.middleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Llamadas de Atención
 *   description: Gestión de llamadas de atención
 */

/**
 * @swagger
 * /api/llamadas-atencion:
 *   get:
 *     summary: Listar llamadas de atención
 *     tags: [Llamadas de Atención]
 *     security:
 *       - bearerAuth: []
 */
router.get('/', verificarToken, llamadaAtencionController.getAll);

/**
 * @swagger
 * /api/llamadas-atencion/personal/{personal_id}:
 *   get:
 *     summary: Listar llamadas de atención por personal
 *     tags: [Llamadas de Atención]
 *     security:
 *       - bearerAuth: []
 */
router.get('/personal/:personal_id', verificarToken, llamadaAtencionController.getByPersonalId);

/**
 * @swagger
 * /api/llamadas-atencion/{id}:
 *   get:
 *     summary: Obtener llamada de atención por ID
 *     tags: [Llamadas de Atención]
 *     security:
 *       - bearerAuth: []
 */
router.get('/:id', verificarToken, llamadaAtencionController.getById);

/**
 * @swagger
 * /api/llamadas-atencion:
 *   post:
 *     summary: Registrar llamada de atención
 *     tags: [Llamadas de Atención]
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
router.post('/', verificarToken, llamadaAtencionController.create);

/**
 * @swagger
 * /api/llamadas-atencion/{id}:
 *   put:
 *     summary: Actualizar llamada de atención
 *     tags: [Llamadas de Atención]
 *     security:
 *       - bearerAuth: []
 */
router.put('/:id', verificarToken, llamadaAtencionController.update);

/**
 * @swagger
 * /api/llamadas-atencion/{id}:
 *   delete:
 *     summary: Eliminar llamada de atención
 *     tags: [Llamadas de Atención]
 *     security:
 *       - bearerAuth: []
 */
router.delete('/:id', verificarToken, llamadaAtencionController.remove);

module.exports = router;