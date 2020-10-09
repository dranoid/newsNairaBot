const puppeteer = require("puppeteer");
const login = require("./details");
const myLink = require("./link");
const comment = require("./comment.js");

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    let commentInd1 = 0;
    let commentInd2 = 0;
    let commentIndAdj = 0;
    let commentIndEnd = 0;
    let determine = 0;
    let num = 0;
    let made = 0;
    page.setDefaultNavigationTimeout(0);

    await page.goto("https://newsnaira.com/login.php");
    await page.type("#user_email", login.username);
    await page.type("#password", login.password);
    await Promise.all([page.waitForNavigation(), page.click("#login_btn")]);

    //come back
    //const currentEarnings = await page.evaluate(() => {});

    //creat the list(array) of links
    await page.goto("https://newsnaira.com");
    const linkList = await page.evaluate(() => {
      let brIndex = 0;
      const container = document.querySelector(".popular");
      const initArray = Array.from(container.children);
      for (let i = 0; i < initArray.length; i++) {
        if (initArray[i].localName == "br") {
          brIndex = i;
        }
        if (initArray[i].localName == "p") {
          initArray.splice(i, 1);
        }
      }
      for (let i = 0; i < brIndex + 2; i++) {
        //the +2 is to factor in the h2 after the br another way can be <=brIndex+1
        initArray.shift();
      }
      const links = initArray.map((link) => {
        return link.href;
      });
      const filteredLinks = links.filter((link) => {
        return typeof link == "string";
      });
      return filteredLinks;
    });

    let newArr, newLinkList;
    for (let i = 2, len = 5; i < len; i++) {
      await page.goto(`https://newsnaira.com/?page=${i}`);
      newLinkList = await page.evaluate(() => {
        let brIndex = 0;
        const container = document.querySelector(".popular");
        const initArray = Array.from(container.children);
        for (let i = 0; i < initArray.length; i++) {
          if (initArray[i].localName == "br") {
            brIndex = i;
          }
          if (initArray[i].localName == "p") {
            initArray.splice(i, 1);
          }
        }
        for (let i = 0; i < brIndex + 2; i++) {
          //the +2 is to factor in the h2 after the br another way can be <=brIndex+1
          initArray.shift();
        }
        const links = initArray.map((link) => {
          return link.href;
        });
        const filteredLinks = links.filter((link) => {
          return typeof link == "string";
        });
        return filteredLinks;
      });
      newArr = linkList.concat(newLinkList);
    }

    // console.log(newArr);
    // console.log(newArr.length);
    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    }
    // console.log("test1");
    // console.log(comment.reaction, "comment was logged here");

    for (let i = 0, len = newArr.length; i < len; i++) {
      if (myLink.visited.link.includes(newArr[i]) == true) {
        console.log("link", i, "has already been visited");
        continue;
      }
      determine = getRandomInt(0, 4);
      commentInd1 = getRandomInt(0, comment.reactLen);
      commentInd2 = getRandomInt(0, comment.reactLen);
      commentIndAdj = getRandomInt(0, comment.adjLen);
      commentIndEnd = getRandomInt(0, comment.enLen);
      // console.log(
      //   `${comment.reaction[commentInd1]} and ${comment.reaction[commentInd2]} are the only words i can find to describe this ${comment.adjective[commentIndAdj]} ${comment.ending[commentIndEnd]}`
      // );
      // console.log(determine, "determine");
      // console.log(commentInd1, "commentInd1");
      // console.log(commentInd2, "commentInd2");
      // console.log(commentIndAdj, "commentIndAdj");
      // console.log(commentIndEnd, "commentIndEnd");

      await page.goto(newArr[i]);
      const iFrame = await page.$(".cke_wysiwyg_frame.cke_reset"); //try initializing it outside the loop
      await iFrame.hover();
      await iFrame.click();
      // await page.keyboard.type(
      //   `${comment.reaction[commentInd1]} and ${comment.reaction[commentInd2]} are the only words i can find to describe this ${comment.adjective[commentIndAdj]} ${comment.ending[commentIndEnd]}`
      // );

      if (determine == 1) {
        await page.keyboard.type(
          `${comment.reaction[commentInd1]} and ${comment.reaction[commentInd2]} are the only words i can find to describe this ${comment.adjective[commentIndAdj]} ${comment.ending[commentIndEnd]}`
        );
      } else if (determine == 2) {
        await page.keyboard.type(
          `${comment.reaction[commentInd1]} and ${comment.reaction[commentInd2]} are the only words that can do justice to this ${comment.adjective[commentIndAdj]} ${comment.ending[commentIndEnd]}`
        );
      } else {
        await page.keyboard.type(
          `${comment.reaction[commentInd1]} and ${comment.reaction[commentInd2]} are too little to say what is on my mind about this ${comment.adjective[commentIndAdj]} ${comment.ending[commentIndEnd]}`
        );
      }

      made += 5;
      console.log(`You've made #${made} so far`);

      await Promise.all([page.waitForNavigation(), page.click("#btn-submit")]);
      // comLink.visited.link.unshift(linkList[1]);
      myLink.save(newArr[i], i);
      page.removeAllListeners();
      console.log(num);
      num += 1;
    }

    await page.goto("https://newsnaira.com");
    console.log("test2");
    // console.log("this is", comment.reaction);

    await page.screenshot({ path: "example.png" });

    await browser.close();
  } catch (error) {
    console.error(error);
  }
})();
