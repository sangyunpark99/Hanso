const express = require("express");
const router = express.Router();

// GET /menu 요청에 대한 응답 함수
router.post("/", (req, res) => {
  try {
    const imageName = "menu.png";

    res.status(200).json({
      version: "2.0",
      template: {
        outputs: [
          {
            simpleImage: {
              imageUrl: `http://sangyun5108.cafe24app.com/${imageName}`,
              altText: "학식입니다.",
            },
          },
        ],
      },
    });
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server Error.");
  }
});

module.exports = router;
