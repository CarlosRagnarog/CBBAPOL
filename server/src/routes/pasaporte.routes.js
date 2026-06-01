const express = require('express');
const pasaporteController = require('../controllers/pasaporte.controller');
const { verificarToken } = require('../middlewares/auth.middleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Pasaportes
 *   description: Gestión de pasaportes del personal
 */

/**
 * @swagger
 * /api/pasaportes:
 *   get:
 *     summary: Listar pasaportes
 *     tags: [Pasaportes]
 *     security:
 *       - bearerAuth: []
 */
router.get('/', verificarToken, pasaporteController.getAll);

/**
 * @swagger
 * /api/pasaportes/personal/{personal_id}:
 *   get:
 *     summary: Listar pasaportes por personal
 *     tags: [Pasaportes]
 *     security:
 *       - bearerAuth: []
 */
router.get('/personal/:personal_id', verificarToken, pasaporteController.getByPersonalId);

/**
 * @swagger
 * /api/pasaportes/{id}:
 *   get:
 *     summary: Obtener pasaporte por ID
 *     tags: [Pasaportes]
 *     security:
 *       - bearerAuth: []
 */
router.get('/:id', verificarToken, pasaporteController.getById);

/**
 * @swagger
 * /api/pasaportes:
 *   post:
 *     summary: Registrar pasaporte
 *     tags: [Pasaportes]
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
 *               nro_folio:
 *                 type: string
 *               nro_pasaporte:
 *                 type: string
 *               dias:
 *                 type: integer
 *               fecha_salida:
 *                 type: string
 *                 format: date
 *               fecha_llegada:
 *                 type: string
 *                 format: date
 *               destino:
 *                 type: string
 *               motivo:
 *                 type: string
 */
router.post('/', verificarToken, pasaporteController.create);

/**
 * @swagger
 * /api/pasaportes/{id}:
 *   put:
 *     summary: Actualizar pasaporte
 *     tags: [Pasaportes]
 *     security:
 *       - bearerAuth: []
 */
router.put('/:id', verificarToken, pasaporteController.update);

/**
 * @swagger
 * /api/pasaportes/{id}:
 *   delete:
 *     summary: Eliminar pasaporte
 *     tags: [Pasaportes]
 *     security:
 *       - bearerAuth: []
 */
router.delete('/:id', verificarToken, pasaporteController.remove);

module.exports = router;