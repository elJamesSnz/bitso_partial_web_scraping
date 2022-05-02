//traer dependencia cheerio
const cheerio = require("cheerio");
//traer dependencia de request-promise
const request = require("request-promise");

//para guardar valores en Excel CSV
const fs = require("fs-extra");
const writeStream = fs.createWriteStream("quotes.csv");

const URLi =
  "https://blog.bitso.com/solana-sol-lleg%C3%B3-a-bitso-904e777d597b";

//función que arranca script
async function init() {
  const $ = await request({
    uri: URLi,
    //transformar datos que se pasa a cheerio enviando el body
    transform: (body) => cheerio.load(body),
  });

  //escribir datos en archivo, primero las columnas a guardar
  writeStream.write("Quote|Author|Tags\n");
  //se recuperan todos los valores que cumplan con un each y se le da tratamiento x elemento
  const quotes = $(".quote").each((i, el) => {
    //encontrar elemento x elemento a través de find y a partir del find hacer el replace
    const text = $(el)
      .find("span.text")
      .text()
      .replace(/(^\“|\”$)/g, "");
    //encontrar una etiqueta span que tiene dentro una etiqueta small y clase author
    const author = $(el).find("span small.author").text();
    //encontrar etiquetas "a" dentro de un div y que además las etiquetas tengan clase tag
    //valores se guardan en arreglo
    const tags = [];

    $(el)
      .find(".tags a.tag")
      .each((j, el) => tags.push($(el).text()));
    //escribir valores de las columnas y salto de línea
    writeStream.write(`${text}|${author}|${tags}\n`);
  });
}

init();

/*

  RECUPERAR ELEMENTOS COMO TÍTULOS
  //título del website con la $ title
  const webTitle = $("title");
  //HTML para que solo regrese el título
  console.log(webTitle.html());
  //título del website con la $ h1 del heading
  const webHeading = $("h1");
  //text por si está dentro de un a href y trim para quitar espacios
  console.log(webHeading.text().trim());
  */

/*
  //recuperar cada elemento similar con un each.
  const quotes = $(".quote span.text").each((i, el) => {
    //-console.log(i, $(el).text());
    //console.log(i, $(el).text().replace());
    const quote_text = $(el).text();
    ///(^\ para indicar a través de frases regulares que reemplace un valor
    //\ para inddicar que está al inicio y $ para indicar que está al final
    const quote = quote_text.replace(/(^\“|\”$)/g, "");
    console.log(i, quote);
  });
*/
//se imprime como arreglo
//console.log(tags);
//se imprime como string separado por comas
//console.log(tags.join(","));

/*
    const elements = $("article")
      .find("h1")
      .each((i, el2) => {
        if (i != 0) {
          bitso_model_sections.sec_title = $(el2).text();
          el = $(el2);
          while (el == el.next()) {
            console.log(el.text());
            if (el.length === 0 || el.prop("tagName") === "H1") break;
            bitso_model_sections.text.push(el.text());
          }
        }
        if (
          bitso_model_sections.text.length > 0 &&
          bitso_model_sections.sec_title
        ) {
          bitso_model.sections.push(bitso_model_sections);
          bitso_model_sections.sec_title = undefined;
          bitso_model_sections.text = [];
        }

        //console.log(
        //i,
        //$(el2).nextUntil("h1").text() //get the text of element
        //);
      });

      */

/*
      
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
    
      
*/
