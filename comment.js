const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");

let num;
for (let i = 0; i <= 5; i++) {
  console.log(i, "in comment");
  num += 1;
}

const comment = [
  "interesting",
  "sad",
  "funny",
  "hillarious",
  "stupid",
  "senseless",
  "magnificient",
  "mind blowing",
  "disgusting",
  "suprising",
  "fucked up",
];
const cLength = comment.length;
const ending = ["event", "happening", "thing"];
const enLen = ending.length;
let words = [];
let check, array;

fetch("https://random-word-api.herokuapp.com/word?number=600&swear=1")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log("Comments are ready");
    // console.log(data);

    fs.writeFile(path.join(__dirname, "vLinks", "comment.txt"), data, (err) => {
      if (err) {
        throw err;
      }
      console.log("Comments sucessfully logged...");
    });
  })
  .catch((e) => {
    console.log("Fetching and logging links did not go well");
    throw e;
  });

function readLinks() {
  //read from file
  try {
    check = fs.readFileSync(
      path.join(__dirname, "vLinks", "comment.txt"),
      "utf8"
    );
    array = check.split(",");
    // console.log(array);
    // console.log(check);
  } catch (e) {
    console.log("Error", e);
  }
  // for (let i = 0; i < array.length; i++) {
  //   if (array[i] == "") {
  //     array.splice(i, 1);
  //   }
  // }
  return array;
}

const data = readLinks();
const comLength = data.length;
// console.log(data[541]);

module.exports = {
  reaction: data,
  reactLen: comLength,
  adjective: comment,
  adjLen: cLength,
  ending: ending,
  enLen: enLen,
};
