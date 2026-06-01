const authService = require('../services/auth.service');

const login = async (req, res) => {
  try {
    const data = await authService.login(req.body);

    res.json({
      ok: true,
      message: 'Login correcto',
      data
    });
  } catch (error) {
    res.status(error.status || 500).json({
      ok: false,
      message: error.message
    });
  }
};

const perfil = async (req, res) => {
  res.json({
    ok: true,
    data: req.user
  });
};

module.exports = {
  login,
  perfil
};