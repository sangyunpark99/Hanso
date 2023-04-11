const fs = require("fs");
const path = require("path");
const express = require("express");
const getImage = require("./utils/getImage");
const menuRouter = require("./router/menuRouter");
const schedule = require("node-schedule");
const morgan = require("morgan");

const app = express();

const job = schedule.scheduleJob("10 * * * * *", () => {
  getImage();
  console.log("이미지가 갱신되었습니다!");
});

const imagePath = path.join(__dirname, "public", "image");

app.use(express.static(imagePath));
app.use(morgan("dev"));

app.use("/menu", menuRouter);

app.listen("8001", () => {
  console.log("서버 실행중..!");
});
