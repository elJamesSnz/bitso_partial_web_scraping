//recuperar modelo de news
const News = require("../models/news");
//traer dependencia cheerio
const cheerio = require("cheerio");
//traer dependencia de request-promise
const request = require("request-promise");

module.exports = {
  /* Peticiones asíncronas para */
  async getBitsoNewsByUri(req, res, next) {
    try {
      //const data = await User.getAll();
      //console.log(`Usuarios: ${data}`);

      const links = await News.getBitsoLinks();

      links.forEach(async (link) => {
        const $ = await request({
          uri: link,
          //transformar datos que se pasa a cheerio enviando el body
          transform: (body) => cheerio.load(body),
        });
        const data = await News.getBitNewsByUri($);
      });

      return res.status(201).json(data);
    } catch (error) {
      console.log(`Error: ${error}`);
      return res.status(501).json({
        success: false,
        message: "Error al obtener todos los usuarios",
      });
    }
  },
  async getNews(req, res, next) {
    try {
      const data = await News.getNews();

      return res.status(201).json(data);
    } catch (error) {
      console.log(`Error: ${error}`);
      return res.status(501).json({
        success: false,
        message: "Error al obtener todos los usuarios",
      });
    }
  },
  async add(req, res, next) {
    try {
      const data = req.body;
      const response = await News.add(data);
      if (response.success) return res.status(201).json(data);
      else
        return res.status(501).json({
          success: false,
          message: "Error al obtener todos los usuarios",
        });
    } catch (error) {
      console.log(`Error: ${error}`);
      return res.status(501).json({
        success: false,
        message: "Error al obtener todos los usuarios",
      });
    }
  },
};
