const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/User");
const auth = require("../middleware/auth.middleware");

const sendDefaultError = (res) =>
  res
    .status(500)
    .json({ message: "На сервере произошла ошибка. Попробуйте позже." });

router.get("/", async (req, res) => {
  try {
    const list = await User.find();
    res.send(list);
  } catch (e) {
    sendDefaultError(res);
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const currentUser = User.findById(userId);

    res.send(currentUser);
  } catch (e) {
    sendDefaultError(res);
  }
});

router.patch("/:userId", auth, async (req, res) => {
  try {
    const { userId } = req.params;

    if (userId === req.user._id) {
      const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
        new: true,
      });
      res.send(updatedUser);
    } else {
      res.status(401).json({ message: "Unautorized" });
    }
  } catch (e) {
    sendDefaultError(res);
  }
});

module.exports = router;
