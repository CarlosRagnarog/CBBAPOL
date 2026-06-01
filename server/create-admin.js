const bcrypt = require('bcrypt');
const pool = require('./src/config/db');

async function crearAdmin() {
  try {
    const passwordHash = await bcrypt.hash('admin123', 10);

    const rolResult = await pool.query(`
      INSERT INTO roles (nombre, descripcion)
      VALUES ('ADMIN', 'Administrador del sistema')
      ON CONFLICT (nombre) DO UPDATE SET descripcion = EXCLUDED.descripcion
      RETURNING id
    `);

    const usuarioResult = await pool.query(`
      INSERT INTO usuarios (username, email, password_hash, activo)
      VALUES ($1, $2, $3, true)
      ON CONFLICT (email) DO UPDATE
      SET username = EXCLUDED.username,
          password_hash = EXCLUDED.password_hash,
          activo = true
      RETURNING id, username, email
    `, [
      'Administrador',
      'admin@cbbapol.bo',
      passwordHash
    ]);

    await pool.query(`
      INSERT INTO usuario_rol (usuario_id, rol_id)
      VALUES ($1, $2)
      ON CONFLICT DO NOTHING
    `, [
      usuarioResult.rows[0].id,
      rolResult.rows[0].id
    ]);

    console.log('Admin creado correctamente');
    console.log('Email: admin@cbbapol.bo');
    console.log('Password: admin123');

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

crearAdmin();