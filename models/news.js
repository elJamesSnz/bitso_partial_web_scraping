//traer dependencia cheerio
const cheerio = require("cheerio");
//traer dependencia de request-promise
const request = require("request-promise");

const express = require("express");
const NewsModel = require("../db/db");

const News = {};

News.getBitsoLinks = () => {
  let news_links = {
    links: [],
  };
};

News.getBitNewsByUri = ($) => {
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
          console.log(i, text);
          if (news_sections.text.length > 0) {
            news_model.sections.push(news_sections);
          }
        }
      })
      .get();

    console.log(news_model);
    News.add(news_model);
  });
};

News.getNews = () => {
  console.log("aquí se hará recuperación de info");

  data = {
    resultado: "aquí se hará recuperación de info",
  };

  return data;
};

News.add = (news_model) => {
  let res = {
    success: false,
    data: undefined,
  };
  var Model = new NewsModel();
  Model.author = news_model.author;
  Model.title = news_model.title;
  Model.subtitle = news_model.subtitle;
  Model.intro = news_model.intro;
  Model.sections = news_model.sections;
  Model.uri = news_model.uri;

  Model.save((err, data) => {
    if (err) {
      console.error(err);
      res.success = false;
      res.data = err;
      return res;
    } else {
      console.log(data);
      res.success = true;
      res.data = data;
      return res;
    }
  });
};

//objeto para el controlador
module.exports = News;
