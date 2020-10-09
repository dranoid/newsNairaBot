// complete overhaul of the file (read/write) logic is needed - use callbacks/promises
const request = require("request");
const cheerio = require("cheerio");
const post = require("./setPost.js");
const fs = require("fs");
const path = require("path");
let postArr = [];
let titleArr = [];
let headerArr = [];
let postingArray = [];
let check;

// postArr = readPosts();
titleArr = readTitle();
console.log(titleArr, "this is title arr");

function readPosts() {
  // read from file
  try {
    check = fs.readFileSync(
      path.join(__dirname, "vLinks", "postText.txt"),
      "utf8"
    );
    postingArray = check.split("\n");
  } catch (e) {
    console.log("Error", e);
  }
  for (let i = 0; i < postingArray.length; i++) {
    if (postingArray[i] == "") {
      postingArray.splice(i, 1);
    }
    if (postingArray[i] == postingArray.length - 1 && postingArray[i] == "") {
      postingArray.splice(i, 1);
    }
  }

  return postingArray;
}

function readTitle() {
  //   const header = fs.readFileSync(
  //     path.join(__dirname, "vLinks", "postTitle.txt"),
  //     "utf8"
  //   );
  //   let headerArr = header.split("\n");
  //   for (let i = 0; i < headerArr.length; i++) {
  //     if (headerArr[i] == "") {
  //       headerArr.splice(i, 1);
  //     }
  //     if (headerArr[i] == headerArr.length - 1 && headerArr[i] == "") {
  //       headerArr.splice(i, 1);
  //     }
  //   }
  //   return headerArr;

  //read from file
  fs.readFile(
    path.join(__dirname, "vLinks", "postTitle.txt"),
    "utf8",
    (err, data) => {
      if (err) throw err;
      headerArr = data.split("\n");
      for (let i = 0; i < headerArr.length; i++) {
        if (headerArr[i] == "") {
          headerArr.splice(i, 1);
        }
        if (headerArr[i] == headerArr.length - 1 && headerArr[i] == "") {
          headerArr.splice(i, 1);
        }
      }
    }
  );
  return headerArr;
}

// module.exports = { visited: visitedLinks, comment: word, save: writeLinks };
