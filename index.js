//traer dependencia cheerio
const cheerio = require("cheerio");
//traer dependencia de request-promise
const request = require("request-promise");

//función que arranca script
async function init() {
  const $ = await request({
    uri: "https://quotes.toscrape.com/",
    //transformar datos que se pasa a cheerio enviando el body
    transform: (body) => cheerio.load(body),
  });
  console.log($);
}

init();
