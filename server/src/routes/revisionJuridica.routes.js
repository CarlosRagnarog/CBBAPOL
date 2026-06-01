const express = require('express');
const revisionJuridicaController = require('../controllers/revisionJuridica.controller');
const { verificarToken } = require('../middlewares/auth.middleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Revisión Jurídica
 *   description: Gestión de revisión jurídica
 */

/**
 * @swagger
 * /api/revision-juridica:
 *   get:
 *     summary: Listar revisiones jurídicas
 *     tags: [Revisión Jurídica]
 *     security:
 *       - bearerAuth: []
 */
router.get('/', verificarToken, revisionJuridicaController.getAll);

/**
 * @swagger
 * /api/revision-juridica/{id}:
 *   get:
 *     summary: Obtener revisión jurídica por ID
 *     tags: [Revisión Jurídica]
 *     security:
 *       - bearerAuth: []
 */
router.get('/:id', verificarToken, revisionJuridicaController.getById);

/**
 * @swagger
 * /api/revision-juridica:
 *   post:
 *     summary: Registrar revisión jurídica
 *     tags: [Revisión Jurídica]
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
 *               codigo:
 *                 type: string
 *               destino:
 *                 type: string
 *               origen:
 *                 type: string
 *               fecha:
 *                 type: string
 *                 format: date
 *               motivo:
 *                 type: string
 *               recepcion:
 *                 type: string
 *               fecha_hora:
 *                 type: string
 *                 format: date-time
 *               firma:
 *                 type: string
 *               entrega:
 *                 type: string
 *               personal_id:
 *                 type: string
 */
router.post('/', verificarToken, revisionJuridicaController.create);

/**
 * @swagger
 * /api/revision-juridica/{id}:
 *   put:
 *     summary: Actualizar revisión jurídica
 *     tags: [Revisión Jurídica]
 *     security:
 *       - bearerAuth: []
 */
router.put('/:id', verificarToken, revisionJuridicaController.update);

/**
 * @swagger
 * /api/revision-juridica/{id}:
 *   delete:
 *     summary: Eliminar revisión jurídica
 *     tags: [Revisión Jurídica]
 *     security:
 *       - bearerAuth: []
 */
router.delete('/:id', verificarToken, revisionJuridicaController.remove);

module.exports = router;