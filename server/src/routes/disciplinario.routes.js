const express = require('express');
const disciplinarioController = require('../controllers/disciplinario.controller');
const { verificarToken } = require('../middlewares/auth.middleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Disciplinario
 *   description: Gestión de registros disciplinarios
 */

/**
 * @swagger
 * /api/disciplinario:
 *   get:
 *     summary: Listar registros disciplinarios
 *     tags: [Disciplinario]
 *     security:
 *       - bearerAuth: []
 */
router.get('/', verificarToken, disciplinarioController.getAll);

/**
 * @swagger
 * /api/disciplinario/personal/{personal_id}:
 *   get:
 *     summary: Listar registros disciplinarios por personal
 *     tags: [Disciplinario]
 *     security:
 *       - bearerAuth: []
 */
router.get('/personal/:personal_id', verificarToken, disciplinarioController.getByPersonalId);

/**
 * @swagger
 * /api/disciplinario/{id}:
 *   get:
 *     summary: Obtener registro disciplinario por ID
 *     tags: [Disciplinario]
 *     security:
 *       - bearerAuth: []
 */
router.get('/:id', verificarToken, disciplinarioController.getById);

/**
 * @swagger
 * /api/disciplinario:
 *   post:
 *     summary: Registrar disciplinario
 *     tags: [Disciplinario]
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
 *               fecha:
 *                 type: string
 *                 format: date
 *               causal:
 *                 type: string
 *               observaciones:
 *                 type: string
 *               autoridad_firma:
 *                 type: string
 */
router.post('/', verificarToken, disciplinarioController.create);

/**
 * @swagger
 * /api/disciplinario/{id}:
 *   put:
 *     summary: Actualizar disciplinario
 *     tags: [Disciplinario]
 *     security:
 *       - bearerAuth: []
 */
router.put('/:id', verificarToken, disciplinarioController.update);

/**
 * @swagger
 * /api/disciplinario/{id}:
 *   delete:
 *     summary: Eliminar disciplinario
 *     tags: [Disciplinario]
 *     security:
 *       - bearerAuth: []
 */
router.delete('/:id', verificarToken, disciplinarioController.remove);

module.exports = router;