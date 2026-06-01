const express = require('express');
const destinoController = require('../controllers/destino.controller');
const { verificarToken } = require('../middlewares/auth.middleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Destinos
 *   description: Gestión de destinos del personal
 */

/**
 * @swagger
 * /api/destinos:
 *   get:
 *     summary: Listar destinos
 *     tags: [Destinos]
 *     security:
 *       - bearerAuth: []
 */
router.get('/', verificarToken, destinoController.getAll);

/**
 * @swagger
 * /api/destinos/personal/{personal_id}:
 *   get:
 *     summary: Listar destinos por personal
 *     tags: [Destinos]
 *     security:
 *       - bearerAuth: []
 */
router.get('/personal/:personal_id', verificarToken, destinoController.getByPersonalId);

/**
 * @swagger
 * /api/destinos/{id}:
 *   get:
 *     summary: Obtener destino por ID
 *     tags: [Destinos]
 *     security:
 *       - bearerAuth: []
 */
router.get('/:id', verificarToken, destinoController.getById);

/**
 * @swagger
 * /api/destinos:
 *   post:
 *     summary: Registrar destino
 *     tags: [Destinos]
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
 *               unidad_anterior:
 *                 type: string
 *               unidad_actual:
 *                 type: string
 *               cargo_actual:
 *                 type: string
 *               memo_nro:
 *                 type: string
 *               fecha_destino:
 *                 type: string
 *                 format: date
 *               estado_personal:
 *                 type: string
 *               observaciones:
 *                 type: string
 */
router.post('/', verificarToken, destinoController.create);

/**
 * @swagger
 * /api/destinos/{id}:
 *   put:
 *     summary: Actualizar destino
 *     tags: [Destinos]
 *     security:
 *       - bearerAuth: []
 */
router.put('/:id', verificarToken, destinoController.update);

/**
 * @swagger
 * /api/destinos/{id}:
 *   delete:
 *     summary: Eliminar destino
 *     tags: [Destinos]
 *     security:
 *       - bearerAuth: []
 */
router.delete('/:id', verificarToken, destinoController.remove);

module.exports = router;