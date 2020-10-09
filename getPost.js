const request = require("request");
const cheerio = require("cheerio");
const util = require("util");
const fs = require("fs");
const path = require("path");
const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);

let links;
let linkArr = [];

request("https://punchng.com/topics/news", (err, response, html) => {
  if (!err && response.statusCode == 200) {
    const $ = cheerio.load(html);

    parent = $("div.items.col-sm-12 a");

    parent.each((i, el) => {
      const link = $(el).attr("href");
      linkArr.push(link);
    });
    links = pushLinks(path.join(__dirname, "vLinks", "postLink.txt"), linkArr);
    links
      .then((data) => {
        // console.log(data, "getPost");
        exportData(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  if (err) {
    console.log(err);
  }
});

async function pushLinks(filePath, fileData) {
  try {
    await writeFile(filePath, fileData);
    let exportLinks = await readFile(filePath, "utf8");
    let exportLinkArr = exportLinks.split(",");
    return exportLinkArr;
  } catch (e) {
    console.error(e);
  }
}
function exportData(nkan) {
  // console.log(nkan);
  module.exports = { postLinks: nkan };
}
