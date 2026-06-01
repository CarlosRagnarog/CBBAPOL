const express = require('express');
const institucionController = require('../controllers/institucion.controller');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Instituciones
 *   description: Gestión de instituciones y unidades
 */

/**
 * @swagger
 * /api/instituciones:
 *   get:
 *     summary: Listar instituciones
 *     tags: [Instituciones]
 */
router.get('/', institucionController.getAll);

/**
 * @swagger
 * /api/instituciones/{id}:
 *   get:
 *     summary: Obtener institución por ID
 *     tags: [Instituciones]
 */
router.get('/:id', institucionController.getById);

/**
 * @swagger
 * /api/instituciones:
 *   post:
 *     summary: Registrar institución
 *     tags: [Instituciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               sigla:
 *                 type: string
 *               tipo:
 *                 type: string
 */
router.post('/', institucionController.create);

/**
 * @swagger
 * /api/instituciones/{id}:
 *   put:
 *     summary: Actualizar institución
 *     tags: [Instituciones]
 */
router.put('/:id', institucionController.update);

/**
 * @swagger
 * /api/instituciones/{id}:
 *   delete:
 *     summary: Eliminar institución lógicamente
 *     tags: [Instituciones]
 */
router.delete('/:id', institucionController.remove);

module.exports = router;