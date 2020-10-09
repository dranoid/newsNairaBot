const fs = require("fs");
const path = require("path");

let num;
for (let i = 0; i <= 5; i++) {
  console.log(i, "in link");
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
const comLen = comment.length;
const word = { reaction: comment, index: comLen };

//to check if the links are for the same day as the program is being run
let linkDate = new Date();
const month = linkDate.toLocaleString("default", { month: "long" });
const year = linkDate.getFullYear();
const day = linkDate.getDate();
date = day.toString() + "-" + month.toString() + "-" + year.toString(); //today
// console.log(date);

let checkDate;
try {
  checkDate = fs.readFileSync(
    path.join(__dirname, "vLinks", "date.txt"),
    "utf8"
  );
} catch (e) {
  console.log("Error", e);
}
if (checkDate != date) {
  setDate(date); //change the date to today's own
  fs.writeFile(path.join(__dirname, "vLinks", "visited.txt"), "", (err) => {
    if (err) throw err;
    console.log("Link list cleared to make space for today");
  });
}

function setDate(theDate) {
  fs.writeFile(
    path.join(__dirname, "vLinks", "date.txt"),
    `${theDate}`,
    (err) => {
      if (err) throw err;
      console.log("Date Saved");
    }
  );
}

let array = [];
let check;

function readLinks() {
  //read from file
  try {
    check = fs.readFileSync(
      path.join(__dirname, "vLinks", "visited.txt"),
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

// console.log(vLen);

function writeLinks(link, index) {
  fs.appendFile(
    path.join(__dirname, "vLinks", "visited.txt"),
    `${link}\n`,
    (err) => {
      if (err) throw err;
      console.log("link", index, "visited and saved");
    }
  );
}
const visLinks = readLinks();
const vLen = visLinks.length;
const visitedLinks = { link: visLinks, index: vLen };

module.exports = { visited: visitedLinks, comment: word, save: writeLinks };
