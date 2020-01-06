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
  const index = Number.parseInt(text.split("第")[1].split("章")[0]);
  text = text
    .split("<!--正文開始-->")[1]
    .split("<!--正文結束-->")[0]
    .trim();
  return { index, text, next };
};

(async () => {
  // first page here
  let url = "http://tw.fxnzw.com/fxnread/45415_9145771.html";
  do {
    let param = await fetchNovel(url);
    url = param.next;
    let path = `texts/${param.index}.txt`;
    if (fs.existsSync(path)) {
      path.replace(".txt", "之2.txt");
      console.log(`${param.index} Duplicate`);
    }
    fs.writeFile(path, param.text, () => {});
    console.log(`${param.index} Done`);
  } while (url != "http://tw.fxnzw.com/fxnread/45415_0.html");
})();
