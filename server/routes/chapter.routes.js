const express = require("express");
const Chapter = require("../models/Chapter");
const router = express.Router({ mergeParams: true });
const auth = require("../middleware/auth.middleware");

router.get("/", async (req, res) => {
  try {
    const list = await Chapter.find();
    res.status(200).send(list);
  } catch (e) {
    res
      .status(500)
      .json({ message: "На сервере произошла ошибка. Попробуйте позже." });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const newChapter = await Chapter.create({
      ...req.body,
      moderateStatus: "onCheck",
    });
    res.send(newChapter);
  } catch (e) {
    return sendDefaultError(res);
  }
});

module.exports = router;
