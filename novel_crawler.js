const fetch = require("node-fetch");
const fs = require("fs");

const nextPage = html => {
  html = html.split('var nextpage ="')[1].split('";')[0];
  return "http://tw.fxnzw.com" + html;
};

const fetchNovel = async url => {
  const promise = await fetch(url);
  let text = await promise.text();
  const next = nextPage(text);
  text = text
    .split("<!--正文開始-->")[1]
    .split("<!--正文結束-->")[0]
    .split("<a")[0] // clear ad
    .replace(/<p\/>/g, "")
    .replace(" 請記住:飛翔鳥中文小說網", "")
    .trim();
  return { text, next };
};

(async () => {
  // first page here
  let url = "http://tw.fxnzw.com/fxnread/45415_8588665.html";
  let index = 748;
  do {
    let param = await fetchNovel(url);
    url = param.next;
    fs.writeFile(`texts/${index}.txt`, param.text, console.log);
    index++;
  } while (url != "http://tw.fxnzw.com/fxnread/45415_0.html");
})();
