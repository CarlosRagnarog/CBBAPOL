const express = require('express');
const rolController = require('../controllers/rol.controller');
const { verificarToken } = require('../middlewares/auth.middleware');
const { permitirRoles } = require('../middlewares/role.middleware');


const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: Gestión de roles del sistema
 */

/**
 * @swagger
 * /api/roles:
 *   get:
 *     summary: Listar roles
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 */
router.get('/', verificarToken, rolController.getAll);

/**
 * @swagger
 * /api/roles/{id}:
 *   get:
 *     summary: Obtener rol por ID
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 */
router.get('/:id', verificarToken, rolController.getById);

/**
 * @swagger
 * /api/roles:
 *   post:
 *     summary: Registrar rol
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 */
router.post('/', verificarToken, permitirRoles('ADMIN'), rolController.create);

/**
 * @swagger
 * /api/roles/{id}:
 *   put:
 *     summary: Actualizar rol
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 */
router.put('/:id', verificarToken, permitirRoles('ADMIN'), rolController.update);

/**
 * @swagger
 * /api/roles/{id}:
 *   delete:
 *     summary: Eliminar rol
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 */
router.delete('/:id', verificarToken, permitirRoles('ADMIN'), rolController.remove);

/**
 * @swagger
 * /api/roles/asignar:
 *   post:
 *     summary: Asignar rol a usuario
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 */
router.post('/asignar', verificarToken, permitirRoles('ADMIN'), rolController.asignarRolUsuario);

/**
 * @swagger
 * /api/roles/quitar:
 *   post:
 *     summary: Quitar rol a usuario
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 */
router.post('/quitar', verificarToken, permitirRoles('ADMIN'), rolController.quitarRolUsuario);

/**
 * @swagger
 * /api/roles/usuario/{usuario_id}:
 *   get:
 *     summary: Listar roles de un usuario
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 */
router.get('/usuario/:usuario_id', verificarToken, rolController.rolesPorUsuario);

module.exports = router;