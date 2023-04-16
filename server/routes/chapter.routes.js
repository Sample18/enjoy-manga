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

router.put("/", auth, async (req, res) => {
  try {
    const newChapter = await Chapter.create({ ...req.body });
    res.send(newChapter);
  } catch (e) {
    sendDefaultError(res);
  }
});

module.exports = router;
