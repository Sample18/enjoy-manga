const express = require("express");
const Chapter = require("../models/Chapter");
const router = express.Router({ mergeParams: true });
const auth = require("../middleware/auth.middleware");

const sendDefaultError = (res) =>
  res
    .status(500)
    .json({ message: "На сервере произошла ошибка. Попробуйте позже." });

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

router.patch("/:chapterId", auth, async (req, res) => {
  try {
    const { chapterId } = req.params;

    const updateChapter = await Chapter.findByIdAndUpdate(chapterId, req.body, {
      new: true,
    });
    res.send(updateChapter);
  } catch (e) {
    sendDefaultError(res);
  }
});

module.exports = router;
