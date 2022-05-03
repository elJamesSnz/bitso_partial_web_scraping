//para poder iniciar aplicación
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const logger = require("morgan");
const cors = require("cors");
//traer dependencia de request-promise
const request = require("request-promise");
//traer módulo de mongoDB
const mongoose = require("mongoose");
//traer el módulo db
const db = require("./config/config");

const news = require("./routes/newsRoutes");
const port = process.env.PORT || 3000;

//debug de posibles errores
app.use(logger("dev"));
//parsear respuestas
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());
//seguridad
app.disable("x-powered-by");

app.set("port", port);

mongoose
  .connect(db.dbUrl, db.connectionParams)
  .then(() => {
    console.info("Connected to the DB");
  })
  .catch((e) => {
    console.log("Error: {db connection}", e);
  });

//Se establecen las rutas
news(app);

//ipconfig -> ipv4
server.listen(3000, "192.168.1.95" || "localhost", function () {
  console.log(
    "Aplicación backend NodeJS " + process.pid + " Iniciada en puerto " + port
  );
});

//Error handler
app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).send(err.stack);
});

//exportar objeto con la aplicación el servidor y usarlos en otros archivos
module.exports = {
  app: app,
  server: server,
};
