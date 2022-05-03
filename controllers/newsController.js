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
      const linkBitso = "https://blog.bitso.com/";
      const $ = await request({
        uri: linkBitso,
        //transformar datos que se pasa a cheerio enviando el body
        transform: (body) => cheerio.load(body),
      });

      //getBisoLinks busca los links, compara y agrega las que no estén en al base de datos
      await News.getBitsoLinks($);

      return res.status(201).json(data);
    } catch (error) {
      console.log(`Error {newsController refresh}: ${error}`);
      return res.status(501).json({
        success: false,
        message: "{noticia duplicada} (ignorar mensaje si son varios links)",
      });
    }
  },
  //para recuperar las noticias guardadas
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
  //agregar noticia manualmente
  async add(req, res, next) {
    try {
      const data = req.body;
      const response = await News.create(data);
      return res.status(201).json(response);
    } catch (error) {
      console.log(`Error {Add}: ${error}`);
      return res.status(501).json({
        success: false,
        message: "Error al agregar la noticia",
      });
    }
  },
  async get(req, res, next) {
    try {
      const data = req.body;
      const response = await News.exists(data);
      return res.status(201).json(response);
    } catch (error) {
      console.log(`Error {exists}: ${error}`);
      return res.status(501).json({
        success: false,
        message: "Error al buscar la noticia",
      });
    }
  },
};
