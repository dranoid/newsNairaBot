const request = require("request");
const cheerio = require("cheerio");
const getPost = require("./getPost.js");
const fs = require("fs");
const path = require("path");
let linkArr = getPost.postLinks;
let postArr = [];
let titleArr = [];
let array = [];
let check;
let text = "";

// console.log(postArr, "this is meant to be postArr");
// linkArr = getPost.postLinks;
// console.log(linkArr);

function doRequest() {
  for (let i = 0; i < 10; i++) {
    if (i == 0) {
      // fs.writeFileSync(path.join(__dirname, "vLinks", "postText.txt"), "");
      // fs.writeFileSync(path.join(__dirname, "vLinks", "postTitle.txt"), "");
      fs.writeFile(
        path.join(__dirname, "vLinks", "postText.txt"),
        "",
        (err) => {
          if (err) throw err;
          console.log("new beginings in text");
        }
      );
      fs.writeFile(
        path.join(__dirname, "vLinks", "postTitle.txt"),
        "",
        (err) => {
          if (err) throw err;
          console.log("new beginings in title");
        }
      );
    }
    request(linkArr[i], (err, response, html) => {
      if (!err && response.statusCode == 200) {
        const $ = cheerio.load(html);
        const title = $("h1.post_title").text();
        container = $("div.entry-content p");
        const len = $("div.entry-content p").length;
        console.log(title);
        container.each((index, el) => {
          if (
            index == 0 ||
            index == len - 1 ||
            index == len - 2 ||
            index == len - 3 ||
            index == len - 4
          ) {
            return;
          }

          let item = $(el).text();
          text = text + item;
        });
        text = text + `\n\nSource: ${linkArr[i]}\n`;
        postArr.push(text);
        titleArr.push(title);
        console.log(postArr[i], "this is from for loop");
        // console.log(linkArr[i], text.substring(0, 51));
        writePost(text, title, i);
        // console.log("done...", "from post");
        text = "";
        // console.log(text, "this is text");
      }
      if (err) {
        console.log(err);
      }
    });
  }
}

//read from file

function readLinks() {
  //read from file
  try {
    check = fs.readFileSync(
      path.join(__dirname, "vLinks", "postLink.txt"),
      "utf8"
    );
    array = check.split("\n"); //the \n part will break on MAC so look for the OS's literal for enter
  } catch (e) {
    console.log("Error", e);
  }
  for (let i = 0; i < array.length; i++) {
    if (array[i] == "") {
      array.splice(i, 1);
    }
  }
  return array;
}

function writePost(postLink, titleText, index) {
  fs.appendFile(
    path.join(__dirname, "vLinks", "postText.txt"),
    `${postLink}\n`,
    (err) => {
      if (err) throw err;
      // console.log("post", index, "has been saved");
    }
  );
  fs.appendFile(
    path.join(__dirname, "vLinks", "postTitle.txt"),
    `${titleText}\n`,
    (err) => {
      if (err) throw err;
      // console.log("post", index, "has been saved");
    }
  );
}
getLinks();
async function getLinks() {
  const links = await getPost.postLinks;
  console.log(links);
}
