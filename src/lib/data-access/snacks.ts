const jsdom = require("jsdom");

export async function getSnacks() {

    const response = await fetch("https://cinemasnacks.co.uk/best-sellers/");
    const html = await response.text();

    const dom = new jsdom.JSDOM(html);
    const articles = dom.window.document.querySelector("article").textContent;

    console.log(articles);
    console.log(typeof articles);

    return "";
  }