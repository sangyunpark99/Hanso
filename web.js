const fs = require("fs");
const path = require("path");
const express = require("express");
const getImage = require("./utils/getImage");
const menuRouter = require("./router/menuRouter");
const schedule = require("node-schedule");
const morgan = require("morgan");

const folderName = "./public/image";
const app = express();

if (!fs.existsSync(folderName)) {
  // 폴더가 존재하지 않는 경우
  fs.mkdirSync(folderName);
  console.log(`${folderName} 생성!`);
}

const job = schedule.scheduleJob("0 15 * * *", () => {
  getImage();
  console.log("이미지가 갱신되었습니다!");
});

const imagePath = path.join(__dirname, "public", "image");

app.use(express.static(imagePath));
app.use(morgan("dev"));

app.use("/menu", menuRouter);
app.use("/", (req, res) => {
  const resJson = {
    version: "2.0",
    template: {
      outputs: [
        {
          simpleText: {
            text: "간단한 텍스트 요소입니다.",
          },
        },
      ],
    },
  };

  res.json(resJson);
});

app.listen("8001", () => {
  console.log("서버 실행중..!");
});
