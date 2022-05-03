//traer dependencia cheerio
const cheerio = require("cheerio");
//traer dependencia de request-promise
const request = require("request-promise");

//para guardar valores en Excel CSV
const fs = require("fs-extra");
const writeStream = fs.createWriteStream("quotes.csv");

const URLi = "https://blog.bitso.com/";

//función que arranca script
async function init() {
  const $ = await request({
    uri: URLi,
    //transformar datos que se pasa a cheerio enviando el body
    transform: (body) => cheerio.load(body),
  });

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
  console.log(news_links);
}

init();
