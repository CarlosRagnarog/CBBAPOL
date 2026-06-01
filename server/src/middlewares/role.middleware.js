const permitirRoles = (...rolesPermitidos) => {
  return (req, res, next) => {
    if (!req.user || !req.user.roles) {
      return res.status(401).json({
        ok: false,
        message: 'Usuario no autenticado'
      });
    }

    const tieneRol = req.user.roles.some(rol =>
      rolesPermitidos.includes(rol)
    );

    if (!tieneRol) {
      return res.status(403).json({
        ok: false,
        message: 'No tiene permisos para realizar esta acción'
      });
    }

    next();
  };
};

module.exports = {
  permitirRoles
};