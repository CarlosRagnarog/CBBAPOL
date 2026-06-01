require('dotenv').config();

const app = require('./app');
const pool = require('./config/db');

const PORT = process.env.PORT || 3000;

async function start() {
  try {

    const client = await pool.connect();

    console.log('✅ PostgreSQL conectado');

    client.release();

    app.listen(PORT, () => {
      console.log(`🚀 Servidor iniciado en puerto ${PORT}`);
    });

  } catch (error) {
    console.error(error);
  }
}

start();