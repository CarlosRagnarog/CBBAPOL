const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const gradoRoutes = require("./routes/grado.routes");
const personalRoutes = require("./routes/personal.routes");
const institucionRoutes = require('./routes/institucion.routes');
const authRoutes = require('./routes/auth.routes');
const usuarioRoutes = require('./routes/usuario.routes');
const rolRoutes = require('./routes/rol.routes');
const asignacionRoutes = require('./routes/asignacion.routes');
const destinoRoutes = require('./routes/destino.routes');
const situacionRoutes = require('./routes/situacion.routes');
const vacacionRoutes = require('./routes/vacacion.routes');
const bajaMedicaRoutes = require('./routes/bajaMedica.routes');   
const comisionRoutes = require('./routes/comision.routes');
const disciplinarioRoutes = require('./routes/disciplinario.routes');
const felicitacionRoutes = require('./routes/felicitacion.routes');
const llamadaAtencionRoutes = require('./routes/llamadaAtencion.routes');
const designacionRoutes = require('./routes/designacion.routes');
const pasaporteRoutes = require('./routes/pasaporte.routes');
const correspondenciaRoutes = require('./routes/correspondencia.routes');
const revisionJuridicaRoutes = require('./routes/revisionJuridica.routes');
const archivoRoutes = require('./routes/archivo.routes');
const path = require('path');
const adjuntoRoutes = require('./routes/adjunto.routes');
const archivoRelRoutes = require('./routes/archivoRel.routes');
const auditLogRoutes = require('./routes/auditLog.routes');

const app = express();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
  res.json({
    mensaje: "API RRHH CBBAPOL funcionando",
    swagger: "http://localhost:3000/api-docs",
  });
});

app.use('/api/auth', authRoutes);
app.use("/api/personal", personalRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use("/api/grados", gradoRoutes);
app.use('/api/instituciones', institucionRoutes);
app.use('/api/roles', rolRoutes);
app.use('/api/asignaciones', asignacionRoutes);
app.use('/api/destinos', destinoRoutes);
app.use('/api/situaciones', situacionRoutes);
app.use('/api/vacaciones', vacacionRoutes);
app.use('/api/bajas-medicas', bajaMedicaRoutes);
app.use('/api/comisiones', comisionRoutes);
app.use('/api/disciplinario', disciplinarioRoutes);
app.use('/api/felicitaciones', felicitacionRoutes);
app.use('/api/llamadas-atencion', llamadaAtencionRoutes);
app.use('/api/designaciones', designacionRoutes);
app.use('/api/pasaportes', pasaporteRoutes);
app.use('/api/correspondencia', correspondenciaRoutes);
app.use('/api/revision-juridica', revisionJuridicaRoutes);
app.use('/api/archivos', archivoRoutes);
app.use('/api/adjuntos', adjuntoRoutes);
app.use('/api/archivos-rel', archivoRelRoutes);
app.use('/api/audit-logs', auditLogRoutes);

module.exports = app;
