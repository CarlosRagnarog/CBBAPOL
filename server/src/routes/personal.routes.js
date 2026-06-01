const express = require("express");
const personalController = require("../controllers/personal.controller");
const { validarCrearPersonal } = require("../validators/personal.validator");
const router = express.Router();
const { verificarToken } = require("../middlewares/auth.middleware");
const { registrarAuditoria } = require("../middlewares/audit.middleware");

/**
 * @swagger
 * tags:
 *   name: Personal
 *   description: Gestión de personal policial
 */

/**
 * @swagger
 * /api/personal:
 *   get:
 *     summary: Listar personal policial
 *     tags: [Personal]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Buscar por nombre, apellido, CI o escalafón
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Número de página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Cantidad por página
 *     responses:
 *       200:
 *         description: Lista de personal
 */
router.get("/", personalController.getAll);

/**
 * @swagger
 * /api/personal/{id}:
 *   get:
 *     summary: Obtener personal por ID
 *     tags: [Personal]
 */
router.get("/:id", personalController.getById);

/**
/**
 * @swagger
 * /api/personal:
 *   post:
 *     summary: Registrar nuevo personal
 *     tags: [Personal]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               escalafon:
 *                 type: string
 *               primer_nombre:
 *                 type: string
 *               segundo_nombre:
 *                 type: string
 *               ap_paterno:
 *                 type: string
 *               ap_materno:
 *                 type: string
 *               ap_esposo:
 *                 type: string
 *               grado_id:
 *                 type: integer
 *               ci:
 *                 type: string
 *               exp:
 *                 type: string
 *               genero:
 *                 type: string
 *               altura_cm:
 *                 type: number
 *               peso_kg:
 *                 type: number
 *               foto_url:
 *                 type: string
 *     responses:
 *       201:
 *         description: Personal registrado correctamente
 */
router.post(
  "/",
  verificarToken,
  validarCrearPersonal,
  registrarAuditoria("personal", "CREAR"),
  personalController.create,
);

/**
 * @swagger
 * /api/personal/{id}:
 *   put:
 *     summary: Actualizar personal
 *     tags: [Personal]
 */
router.put(
  "/:id",
  verificarToken,
  validarCrearPersonal,
  registrarAuditoria("personal", "ACTUALIZAR"),
  personalController.update,
);

/**
 * @swagger
 * /api/personal/{id}:
 *   delete:
 *     summary: Eliminar personal lógicamente
 *     tags: [Personal]
 */
router.delete(
  "/:id",
  verificarToken,
  registrarAuditoria("personal", "ELIMINAR"),
  personalController.remove,
);

module.exports = router;
