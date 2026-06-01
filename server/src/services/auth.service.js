const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authRepository = require('../repositories/auth.repository');

const login = async ({ email, password }) => {
  const user = await authRepository.findUserByEmail(email);

  if (!user) {
    const error = new Error('Credenciales inválidas');
    error.status = 401;
    throw error;
  }

  if (!user.activo) {
    const error = new Error('Usuario inactivo');
    error.status = 403;
    throw error;
  }

  const passwordOk = await bcrypt.compare(password, user.password_hash);

  if (!passwordOk) {
    const error = new Error('Credenciales inválidas');
    error.status = 401;
    throw error;
  }

  const roles = await authRepository.findUserRoles(user.id);

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
      roles
    },
    process.env.JWT_SECRET,
    { expiresIn: '8h' }
  );

  return {
    token,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      roles
    }
  };
};

module.exports = {
  login
};