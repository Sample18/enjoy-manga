const express = require("express");
const Chapter = require("../models/Chapter");
const router = express.Router({ mergeParams: true });
const auth = require("../middleware/auth.middleware");
const User = require("../models/User");

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

router.delete("/:chapterId", auth, async (req, res) => {
  try {
    const { chapterId } = req.params;
    const removedChapter = await Chapter.findById(chapterId);
    const user = await User.findById(req.user._id);

    if (user.role === "admin") {
      await removedChapter.deleteOne();
      return res.send(null);
    } else {
      res.status(401).json({ message: "NoAccessRights" });
    }
  } catch (e) {
    sendDefaultError(res);
  }
});

module.exports = router;
