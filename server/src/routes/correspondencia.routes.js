const express = require('express');
const correspondenciaController = require('../controllers/correspondencia.controller');
const { verificarToken } = require('../middlewares/auth.middleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Correspondencia
 *   description: Gestión de correspondencia
 */

/**
 * @swagger
 * /api/correspondencia:
 *   get:
 *     summary: Listar correspondencia
 *     tags: [Correspondencia]
 *     security:
 *       - bearerAuth: []
 */
router.get('/', verificarToken, correspondenciaController.getAll);

/**
 * @swagger
 * /api/correspondencia/{id}:
 *   get:
 *     summary: Obtener correspondencia por ID
 *     tags: [Correspondencia]
 *     security:
 *       - bearerAuth: []
 */
router.get('/:id', verificarToken, correspondenciaController.getById);

/**
 * @swagger
 * /api/correspondencia:
 *   post:
 *     summary: Registrar correspondencia
 *     tags: [Correspondencia]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tipo:
 *                 type: string
 *               codigo_registro:
 *                 type: string
 *               origen:
 *                 type: string
 *               nro_oficio:
 *                 type: string
 *               referencia:
 *                 type: string
 *               remitente:
 *                 type: string
 *               seccion:
 *                 type: string
 *               fecha_hora:
 *                 type: string
 *                 format: date-time
 *               firma:
 *                 type: string
 *               tiempo_respuesta:
 *                 type: string
 *               personal_id:
 *                 type: string
 */
router.post('/', verificarToken, correspondenciaController.create);

/**
 * @swagger
 * /api/correspondencia/{id}:
 *   put:
 *     summary: Actualizar correspondencia
 *     tags: [Correspondencia]
 *     security:
 *       - bearerAuth: []
 */
router.put('/:id', verificarToken, correspondenciaController.update);

/**
 * @swagger
 * /api/correspondencia/{id}:
 *   delete:
 *     summary: Eliminar correspondencia
 *     tags: [Correspondencia]
 *     security:
 *       - bearerAuth: []
 */
router.delete('/:id', verificarToken, correspondenciaController.remove);

module.exports = router;