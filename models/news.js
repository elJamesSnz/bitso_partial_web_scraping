//traer dependencia cheerio
const cheerio = require("cheerio");
//traer dependencia de request-promise
const request = require("request-promise");

const express = require("express");
const NewsModel = require("../db/db");

const News = {};

let final_links = {
  enlaces: [],
};

News.create = (news_model) => {
  var Model = new NewsModel();
  Model.author = news_model.author;
  Model.title = news_model.title;
  Model.subtitle = news_model.subtitle;
  Model.intro = news_model.intro;
  Model.sections = news_model.sections;
  Model.uri = news_model.uri;

  Model.save((err, data) => {
    if (err) {
      //console.error(err);
    } else {
      //return data;
    }
  });
};

News.getBitNewsByUri = ($, URLi) => {
  let news_model = {
    author: "",
    title: "",
    subtitle: "",
    intro: "",
    sections: [],
    uri: "",
  };

  const article = $("article").each((i, el) => {
    news_model.author = $(el).find(".pw-author a.au").text();
    news_model.title = $(el).find("h1.pw-post-title").text();
    news_model.subtitle = $(el).find("strong.kh").first().text();
    news_model.uri = URLi;

    //console.log($(".jb").siblings("p.ki.kj")..text());

    let intro_text = "";

    const intro2 = $(".jb")
      .find("figure")
      .first()
      .each((i, el) => {
        intro_text += $(el).nextUntil("h1").text() + "\n";
        news_model.intro = intro_text;
      });

    let texts = $("h1")
      .map((i, el) => {
        if (i != 0) {
          let news_sections = {
            sec_title: "",
            text: "",
          };
          let text = "";
          el = $(el);
          news_sections.sec_title = $(el).text();
          while ((el = el.next())) {
            if (el.length === 0 || el.prop("tagName") === "H1") break;
            text += el.text() + "\n";
          }
          news_sections.text = text;
          if (news_sections.text.length > 0) {
            news_model.sections.push(news_sections);
          }
        }
      })
      .get();
    News.create(news_model);
  });
};

News.exists = (news_model) => {
  var Model = new NewsModel();

  news_model.links.forEach(async (link) => {
    Model.title = link.enlace;
    var enlace = link.enlace;
    //const data = await Model.exists({ title: link.titulo });
    NewsModel.exists({ title: link.titulo }, async function (err, result) {
      if (!result) {
        console.log(enlace);
        final_links.enlaces.push(enlace);

        const $ = await request({
          uri: enlace,
          //transformar datos que se pasa a cheerio enviando el body
          transform: (body) => cheerio.load(body),
        });

        News.getBitNewsByUri($, enlace);
      } else {
        if (err) {
          throw "Error al buscar las noticias {exists}";
        }
      }
    });
  });
};

News.getBitsoLinks = ($) => {
  let news_links = {
    links: [],
  };

  const article2 = $("a h3").each((i, el) => {
    let links_model = {
      titulo: "",
      enlace: "",
    };

    const link = $(el).parent().attr("href");
    const titulo = $(el).text();

    links_model.titulo = titulo;
    links_model.enlace = link;
    news_links.links.push(links_model);
  });

  console.log("LINKS OBTENIDOS");
  News.exists(news_links);
};

News.getNews = () => {
  console.log("aquí se hará recuperación de info");

  data = {
    resultado: "aquí se hará recuperación de info",
  };

  return data;
};

//objeto para el controlador
module.exports = News;
