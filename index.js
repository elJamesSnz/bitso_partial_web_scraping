//traer dependencia cheerio
const cheerio = require("cheerio");
//traer dependencia de request-promise
const request = require("request-promise");

//para guardar valores en Excel CSV
const fs = require("fs-extra");
const writeStream = fs.createWriteStream("quotes.csv");

//función que arranca script
async function init() {
  const $ = await request({
    uri: "https://quotes.toscrape.com/",
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
