const express = require('express');
const auditLogController = require('../controllers/auditLog.controller');
const { verificarToken } = require('../middlewares/auth.middleware');
const { permitirRoles } = require('../middlewares/role.middleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auditoría
 *   description: Registro de acciones del sistema
 */

/**
 * @swagger
 * /api/audit-logs:
 *   get:
 *     summary: Listar auditoría
 *     tags: [Auditoría]
 *     security:
 *       - bearerAuth: []
 */
router.get('/', verificarToken, permitirRoles('ADMIN'), auditLogController.getAll);

module.exports = router;