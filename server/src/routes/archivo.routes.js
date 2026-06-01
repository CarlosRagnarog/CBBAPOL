const express = require('express');
const archivoController = require('../controllers/archivo.controller');
const { verificarToken } = require('../middlewares/auth.middleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Archivos
 *   description: Gestión de archivos administrativos
 */

/**
 * @swagger
 * /api/archivos:
 *   get:
 *     summary: Listar archivos
 *     tags: [Archivos]
 *     security:
 *       - bearerAuth: []
 */
router.get('/', verificarToken, archivoController.getAll);

/**
 * @swagger
 * /api/archivos/{id}:
 *   get:
 *     summary: Obtener archivo por ID
 *     tags: [Archivos]
 *     security:
 *       - bearerAuth: []
 */
router.get('/:id', verificarToken, archivoController.getById);

/**
 * @swagger
 * /api/archivos:
 *   post:
 *     summary: Registrar archivo
 *     tags: [Archivos]
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
 *               fecha:
 *                 type: string
 *                 format: date
 *               nombre:
 *                 type: string
 *               inicio:
 *                 type: string
 *                 format: date
 *               fin:
 *                 type: string
 *                 format: date
 */
router.post('/', verificarToken, archivoController.create);

/**
 * @swagger
 * /api/archivos/{id}:
 *   put:
 *     summary: Actualizar archivo
 *     tags: [Archivos]
 *     security:
 *       - bearerAuth: []
 */
router.put('/:id', verificarToken, archivoController.update);

/**
 * @swagger
 * /api/archivos/{id}:
 *   delete:
 *     summary: Eliminar archivo
 *     tags: [Archivos]
 *     security:
 *       - bearerAuth: []
 */
router.delete('/:id', verificarToken, archivoController.remove);

module.exports = router;