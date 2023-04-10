const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const env = require("dotenv");

env.config();

const getImage = require("../utils/getImage");

// GET /menu 요청에 대한 응답 함수
router.get("/", (req, res) => {
  // 이미지 이름 저장에 필요한 항목 - 년, 월, 일
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  try {
    const imageName = `menu_${`${year}-${month
      .toString()
      .padStart(2, "0")}-${day.toString().padStart(2, "0")}`}.png`;

    // 절대 경로로 지정 -> 파일 경로 오류 방지
    const filePath = path.join(__dirname, `../public/image/${imageName}`);

    if (!fs.existsSync(filePath)) {
      getImage();
    }

    res
      .status(200)
      .json({
        imageUrl: `http://${process.env.ADDRESS}:${process.env.PORT}/${imageName}`,
      });
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server Error.");
  }
});

module.exports = router;
