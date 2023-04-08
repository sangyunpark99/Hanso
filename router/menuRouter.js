const express = require("express");
const router = express.Router();
// const getImage = require("../utils/getImage");
const fs = require("fs");
const path = require("path");

// GET /menu 요청에 대한 응답 함수
router.get("/", async (req, res) => {
  // 이미지 이름 저장에 필요한 항목 - 년, 월, 일
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  try {
    console.log("요청이 날라왔습니다");

    res.set("Content-Type", "image/png"); // 이미지 파일임을 명시

    const imageName = `menu_${`${year}-${month
      .toString()
      .padStart(2, "0")}-${day.toString().padStart(2, "0")}`}.png`;

    // 절대 경로로 지정 -> 파일 경로 오류 방지
    const filePath = path.join(__dirname, `../public/image/${imageName}`);

    const resJson = {
      version: "1.0",
      template: {
        outputs: [
          {
            simpleImage: {
              imageUrl:
                "https://www.google.com/url?sa=i&url=https%3A%2F%2Fnews.mt.co.kr%2Fmtview.php%3Fno%3D2022092510492962871&psig=AOvVaw1cIWKcVC3WQOyQk-5UJe1X&ust=1681028880848000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCOjWsdzumf4CFQAAAAAdAAAAABAD",
              altText: "학식 식단입니다",
            },
          },
        ],
      },
    };

    res.status(200).sendFile(filePath);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server Error.");
  }
});

module.exports = router;
