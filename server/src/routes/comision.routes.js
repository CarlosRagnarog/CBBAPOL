const express = require('express');
const comisionController = require('../controllers/comision.controller');
const { verificarToken } = require('../middlewares/auth.middleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Comisiones
 *   description: Gestión de comisiones del personal
 */

/**
 * @swagger
 * /api/comisiones:
 *   get:
 *     summary: Listar comisiones
 *     tags: [Comisiones]
 *     security:
 *       - bearerAuth: []
 */
router.get('/', verificarToken, comisionController.getAll);

/**
 * @swagger
 * /api/comisiones/personal/{personal_id}:
 *   get:
 *     summary: Listar comisiones por personal
 *     tags: [Comisiones]
 *     security:
 *       - bearerAuth: []
 */
router.get('/personal/:personal_id', verificarToken, comisionController.getByPersonalId);

/**
 * @swagger
 * /api/comisiones/{id}:
 *   get:
 *     summary: Obtener comisión por ID
 *     tags: [Comisiones]
 *     security:
 *       - bearerAuth: []
 */
router.get('/:id', verificarToken, comisionController.getById);

/**
 * @swagger
 * /api/comisiones:
 *   post:
 *     summary: Registrar comisión
 *     tags: [Comisiones]
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
 *               desde:
 *                 type: string
 *                 format: date
 *               hasta:
 *                 type: string
 *                 format: date
 *               unidad_org:
 *                 type: string
 *               autoridad_firma:
 *                 type: string
 */
router.post('/', verificarToken, comisionController.create);

/**
 * @swagger
 * /api/comisiones/{id}:
 *   put:
 *     summary: Actualizar comisión
 *     tags: [Comisiones]
 *     security:
 *       - bearerAuth: []
 */
router.put('/:id', verificarToken, comisionController.update);

/**
 * @swagger
 * /api/comisiones/{id}:
 *   delete:
 *     summary: Eliminar comisión
 *     tags: [Comisiones]
 *     security:
 *       - bearerAuth: []
 */
router.delete('/:id', verificarToken, comisionController.remove);

module.exports = router;