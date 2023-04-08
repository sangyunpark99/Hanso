const fs = require("fs");
const express = require("express");
const getImage = require("./utils/getImage");
const menuRouter = require("./router/menuRouter");

const folderName = "./public/image";
const app = express();

if (!fs.existsSync(folderName)) {
  // 폴더가 존재하지 않는 경우
  fs.mkdirSync(folderName);
  console.log(`${folderName} 생성!`);
}

// image 폴더내에 사진 저장하기
if (fs.ReadStream(folderName)) {
  getImage();
}

// GET menu
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

app.listen("3000", () => {
  console.log("서버 실행중..!");
});
