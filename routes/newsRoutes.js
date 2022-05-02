//se accede al controlador
const NewsController = require("../controllers/newsController");

module.exports = (app) => {
  //get para traer todas las noticias
  app.get("/api/news/getNews", NewsController.getNews);
  //POST para actualizar las noticias
  app.post("/api/news/refreshNews", NewsController.getBitsoNewsByUri);
  //POST para agregar noticia
  app.post("/api/news/add", NewsController.add);
};
