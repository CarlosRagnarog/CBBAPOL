const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const gradoRoutes = require("./routes/grado.routes");
const personalRoutes = require("./routes/personal.routes");
const institucionRoutes = require('./routes/institucion.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
  res.json({
    mensaje: "API RRHH CBBAPOL funcionando",
    swagger: "http://localhost:3000/api-docs",
  });
});

app.use("/api/personal", personalRoutes);
app.use("/api/grados", gradoRoutes);
app.use('/api/instituciones', institucionRoutes);

module.exports = app;
