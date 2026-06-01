const auditLogService = require('../services/auditLog.service');

const registrarAuditoria = (entidad, accion) => {
  return async (req, res, next) => {
    const originalJson = res.json;

    res.json = async function (body) {
      try {
        if (body && body.ok === true) {
          await auditLogService.createAuditLog({
            actor_id: req.user?.id || null,
            entidad,
            entidad_id: req.params.id || body.data?.id || null,
            accion,
            payload: JSON.stringify({
              params: req.params,
              body: req.body
            })
          });
        }
      } catch (error) {
        console.error('Error registrando auditoría:', error.message);
      }

      return originalJson.call(this, body);
    };

    next();
  };
};

module.exports = {
  registrarAuditoria
};