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
  });
}

init();
