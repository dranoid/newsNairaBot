const puppeteer = require("puppeteer");
process.setMaxListeners(Infinity);

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(0);

  //logging in
  await page.goto("https://www.giftalworld.com/login").catch((e) => {
    console.log("Login didn't go well");
    throw e;
  });
  await page.type("#username", "Ife Darams").catch((e) => {
    console.log("Username didn't go well");
    throw e;
  });
  await page.type("#password", "Sayodaramsz9").catch((e) => {
    console.log("Password didn't go well");
    throw e;
  });
  await Promise.all([page.waitForNavigation(), page.click("#user_login_btn")]);

  //getting gas points
  const points = await page
    .evaluate(() => {
      const diver = document.querySelector(".custome_points_tz div");
      console.log(diver.innerHTML);
      return diver.innerHTML;
    })
    .catch((e) => {
      console.log("getting GAS points didn't go well");
      throw e;
    });

  console.log("Your GAS points:", points);

  //clicking the links

  await page.goto("https://www.giftalworld.com").catch((e) => {
    console.log("goto Homepage didn't go well");
    throw e;
  });

  const linkList = await page
    .evaluate(() => {
      const me = Array.from(document.querySelectorAll(".more-link"));
      const lays = me.map((lint) => {
        return lint.href;
      });
      return lays;
    })
    .catch((e) => {
      console.log("returning list of links didn't go well");
      throw e;
    });
  // console.log(linkList);

  let num = 0;
  for (let i = 0; i < linkList.length; i++) {
    page.removeAllListeners();
    await page.goto(linkList[i]);
    await page.goBack();
    page.removeAllListeners();
    console.log(num);
    num += 1;
  }

  //getting gas points after
  const profilePage = await page
    .evaluate(() => {
      const link = document.querySelector(
        ".menu-item.menu-item-270531 .sub-menu .menu-item-296059 a"
      );
      return link.href;
    })
    .catch((e) => {
      console.log("going getting profile page link didn't go well");
      throw e;
    });

  await page.goto(profilePage).catch((e) => {
    console.log("goto profile page didn't go well");
    throw e;
  });

  //getting new GAS points
  const newpoints = await page
    .evaluate(() => {
      const diver = document.querySelector(".custome_points_tz div");
      console.log(diver.innerHTML);
      return diver.innerHTML;
    })
    .catch((e) => {
      console.log("getting GAS points didn't go well");
      throw e;
    });

  console.log("Your current GAS points:", newpoints);

  let earnPoints = newpoints - points;
  console.log("GAS points made this session:", earnPoints);

  await page.screenshot({ path: "screenshot.png" });
  await browser.close();
})().catch((e) => {
  console.error(e);
});
