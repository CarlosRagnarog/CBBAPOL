const express = require('express');
const gradoController = require('../controllers/grado.controller');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Grados
 *   description: Gestión de grados policiales
 */

/**
 * @swagger
 * /api/grados:
 *   get:
 *     summary: Listar grados policiales
 *     tags: [Grados]
 *     responses:
 *       200:
 *         description: Lista de grados
 */
router.get('/', gradoController.getAll);

/**
 * @swagger
 * /api/grados/{id}:
 *   get:
 *     summary: Obtener grado por ID
 *     tags: [Grados]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Grado encontrado
 */
router.get('/:id', gradoController.getById);

/**
 * @swagger
 * /api/grados:
 *   post:
 *     summary: Registrar grado
 *     tags: [Grados]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               nombre:
 *                 type: string
 *               orden:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Grado registrado
 */
router.post('/', gradoController.create);

/**
 * @swagger
 * /api/grados/{id}:
 *   put:
 *     summary: Actualizar grado
 *     tags: [Grados]
 */
router.put('/:id', gradoController.update);

/**
 * @swagger
 * /api/grados/{id}:
 *   delete:
 *     summary: Eliminar grado
 *     tags: [Grados]
 */
router.delete('/:id', gradoController.remove);

module.exports = router;