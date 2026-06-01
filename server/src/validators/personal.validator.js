const { body, validationResult } = require('express-validator');

const validarErrores = (req, res, next) => {
  const errores = validationResult(req);

  if (!errores.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errores.array()
    });
  }

  next();
};

const validarCrearPersonal = [
  body('primer_nombre')
    .notEmpty()
    .withMessage('El primer nombre es obligatorio'),

  body('ci')
    .notEmpty()
    .withMessage('El CI es obligatorio'),

  body('grado_id')
    .optional()
    .isInt()
    .withMessage('El grado_id debe ser un número entero'),

  body('altura_cm')
    .optional()
    .isNumeric()
    .withMessage('La altura debe ser numérica'),

  body('peso_kg')
    .optional()
    .isNumeric()
    .withMessage('El peso debe ser numérico'),

  validarErrores
];

module.exports = {
  validarCrearPersonal
};