const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const getImage = async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.goto("https://coop.koreatech.ac.kr/dining/menu.php");

  // 이미지 이름 저장에 필요한 항목 - 년, 월, 일
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  // 특정 태그를 선택 - 식단표 선택
  const elements = await page.$$("table");
  let screenshotElment;

  const dirPath = path.join(__dirname, `../public/image`);

  fs.readdir(dirPath, (err, files) => {
    if (err) {
      throw err;
    }

    if (files) {
      // 기존에 존재하던 파일 삭제
      files.forEach((file) => {
        fs.unlink(`${dirPath}/${file}`, (err) => {
          if (err) {
            throw err;
          }
        });
      });
    }
  });

  elements.forEach((value, index) => {
    // 여러 Element를 순회하면서 학식 테이블만 선택
    if (index == 1) {
      screenshotElment = value;
    }
  });

  // 태그를 캡쳐
  const screenshot = await screenshotElment.screenshot();

  // 이미지 파일로 저장
  fs.writeFile(`public/image/menu.png`, screenshot, (err) => {
    if (err) {
      throw err;
    }
    console.log("학교 식단 사진이 저장되었습니다");
  });

  await browser.close();
};

module.exports = getImage;
