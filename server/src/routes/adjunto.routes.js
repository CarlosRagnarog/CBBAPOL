const express = require('express');
const adjuntoController = require('../controllers/adjunto.controller');
const { verificarToken } = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload.middleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Adjuntos
 *   description: Gestión de archivos adjuntos
 */

/**
 * @swagger
 * /api/adjuntos:
 *   get:
 *     summary: Listar adjuntos
 *     tags: [Adjuntos]
 *     security:
 *       - bearerAuth: []
 */
router.get('/', verificarToken, adjuntoController.getAll);

/**
 * @swagger
 * /api/adjuntos/{id}:
 *   get:
 *     summary: Obtener adjunto por ID
 *     tags: [Adjuntos]
 *     security:
 *       - bearerAuth: []
 */
router.get('/:id', verificarToken, adjuntoController.getById);

/**
 * @swagger
 * /api/adjuntos/upload:
 *   post:
 *     summary: Subir archivo adjunto
 *     tags: [Adjuntos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               archivo:
 *                 type: string
 *                 format: binary
 */
router.post('/upload', verificarToken, upload.single('archivo'), adjuntoController.upload);

/**
 * @swagger
 * /api/adjuntos/{id}:
 *   delete:
 *     summary: Eliminar adjunto
 *     tags: [Adjuntos]
 *     security:
 *       - bearerAuth: []
 */
router.delete('/:id', verificarToken, adjuntoController.remove);

module.exports = router;